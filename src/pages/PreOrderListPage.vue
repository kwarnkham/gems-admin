<template>
  <q-page
    padding
    v-if="pagination"
    v-scroll="fetchMore"
    class="row content-baseline"
  >
    <div
      class="text-right full-width"
      v-if="Object.keys(route.query).length > 0"
    >
      <q-icon name="filter_alt" />
    </div>
    <div
      class="q-pa-sm col-12"
      v-for="preOrder in pagination.data"
      :key="preOrder.id"
    >
      <q-card
        @click="
          $router.push({
            name: 'pre-order-details',
            params: { id: preOrder.id },
          })
        "
      >
        <q-card-section>
          <div class="row items-center justify-between">
            <div><q-icon name="person" />{{ preOrder.contact.name }}</div>
            <div><q-icon name="phone" /> {{ preOrder.contact.phone }}</div>
          </div>
        </q-card-section>

        <q-card-section class="row q-gutter-x-sm no-wrap">
          <div class="text-ellipsis">
            <template v-for="key in Object.keys(preOrder)" :key="key">
              <div
                class="capitalize"
                v-if="
                  ![
                    'created_at',
                    'updated_at',
                    'id',
                    'contact_id',
                    'contact',
                  ].includes(key)
                "
              >
                {{ key }} : {{ preOrder[key] ?? "tbd" }}
              </div>
            </template>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="text-center full-width" v-if="fetching">
      <q-spinner-dots size="md" />
    </div>

    <FloatingActionButton
      icon="add"
      @click.stop="
        $router.push({
          name: 'add-pre-order',
        })
      "
    />
  </q-page>
</template>

<script setup>
import { debounce } from "quasar";
import FloatingActionButton from "src/components/FloatingActionButton.vue";
import usePagination from "src/composables/pagination";
import useUtil from "src/composables/utils";
import { useRoute } from "vue-router";

const route = useRoute();
const { pagination, currentPage, fetching } = usePagination({
  url: "pre-orders",
  params: { per_page: 10, contact_id: route.query.contact_id },
  append: true,
});

const { isScrollEndByBody } = useUtil();

const fetchMore = debounce((position) => {
  if (isScrollEndByBody(position)) {
    if (pagination.value.last_page > currentPage.value) currentPage.value += 1;
  }
}, 500);
</script>
