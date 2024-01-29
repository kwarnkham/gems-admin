<template>
  <q-page
    padding
    class="row content-baseline"
    v-if="pagination"
    v-scroll="fetchMore"
  >
    <div class="q-pa-sm col-12" v-for="item in pagination.data" :key="item.id">
      <q-card
        @click="$router.push({ name: 'item-details', params: { id: item.id } })"
      >
        <q-card-section>
          {{ item.name }}
        </q-card-section>
        <q-card-section>
          <q-img
            :src="item.pictures[0]?.name"
            v-if="item.pictures"
            fit="contain"
            height="150px"
          />
        </q-card-section>
        <q-card-section class="row">
          <div class="col-12 text-ellipsis">
            {{ item.description }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="text-center full-width" v-if="fetching">
      <q-spinner-dots size="md" />
    </div>
    <FloatingActionButton
      @click.stop="$router.push({ name: 'add-item' })"
      icon="add"
    />
  </q-page>
</template>

<script setup>
import { debounce } from "quasar";
import FloatingActionButton from "src/components/FloatingActionButton.vue";
import usePagination from "src/composables/pagination";
import useUtil from "src/composables/utils";

const { pagination, currentPage, fetching } = usePagination({
  url: "items",
  params: { per_page: 10 },
  append: true,
});

const { isScrollEndByBody } = useUtil();

const fetchMore = debounce((position) => {
  if (isScrollEndByBody(position)) {
    if (pagination.value.last_page > currentPage.value) currentPage.value += 1;
  }
}, 500);
</script>
