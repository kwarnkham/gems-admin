<template>
  <q-page padding v-if="pagination" class="row content-baseline">
    <div class="q-pa-sm col-12" v-for="item in pagination.data" :key="item.id">
      <q-card class="rounded card" dark>
        <q-img :src="item.pictures[0].name" v-if="item.pictures.lenth" />
        <q-img
          v-else
          src="https://assets.pi55xx.com/gems/assets/diamond-logo-2.png"
        >
          <div class="absolute-bottom text-subtitle2 text-center card-label">
            {{ item.name }}
          </div>
        </q-img>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import usePagination from "src/composables/pagination";

const { pagination } = usePagination({
  url: "items",
  append: true,
  params: {
    per_page: 10,
    status: 1,
  },
});
</script>

<style lang="scss" scoped>
.card {
  height: 229.63px;
}
.card-label {
  padding: 5px;
}
</style>
