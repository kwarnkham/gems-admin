<template>
  <q-page padding class="row" v-if="pagination">
    <div class="q-pa-sm col" v-for="item in pagination.data" :key="item.id">
      <q-card
        @click="$router.push({ name: 'item-details', params: { id: item.id } })"
      >
        <q-card-section>
          {{ item.name }}
        </q-card-section>
        <q-card-section>
          <q-img
            :src="item.pictures[0].name"
            v-if="item.pictures"
            fit="contain"
            height="150px"
          />
        </q-card-section>
        <q-card-section class="row">
          <div class="col-12 text-ellipsis">
            {{ item.description }} Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Veniam non ipsam laboriosam laudantium quaerat
            fugiat aspernatur deleniti quia inventore, aliquam ullam eligendi
            sapiente harum dolor nisi, facere minima voluptates culpa.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import usePagination from "src/composables/pagination";

const { pagination } = usePagination({
  url: "items",
  params: { per_page: 10 },
});
</script>
