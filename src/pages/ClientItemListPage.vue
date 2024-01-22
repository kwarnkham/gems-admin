<template>
  <q-page padding v-if="pagination" class="row content-baseline">
    <div class="q-pa-sm col-12" v-for="item in pagination.data" :key="item.id">
      <q-card
        class="rounded"
        dark
        @click="
          $router.push({
            name: 'client-item-details',
            params: {
              id: item.id,
            },
          })
        "
      >
        <q-img
          :src="
            item.pictures.length <= 0
              ? 'https://assets.pi55xx.com/gems/assets/diamond-logo-1.png'
              : item.pictures[0].name
          "
        >
          <div class="absolute-bottom text-subtitle2 text-center card-label">
            {{ item.name }}
          </div>
        </q-img>
      </q-card>
    </div>
    <q-page-sticky :offset="[18, 18]">
      <q-btn icon="search" round color="info" @click="showSearchDialog" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import usePagination from "src/composables/pagination";
import SearchItemDialog from "src/components/SearchItemDialog.vue";
import { ref } from "vue";
import { watch } from "vue";

const { dialog } = useQuasar();
const carat = ref("");
const clarity = ref("");
const price = ref("");
const cut = ref("");
const color = ref("");
const { pagination, updateQueryAndFetch } = usePagination({
  url: "items",
  append: true,
  params: {
    per_page: 10,
    status: 1,
  },
});

watch([carat, clarity, price, cut, color], () => {
  pagination.value.data = [];
  updateQueryAndFetch({
    status: 1,
    per_page: 10,
    carat: carat.value,
    clarity: clarity.value,
    price: price.value,
    cut: cut.value,
    color: color.value,
  });
});

const showSearchDialog = () => {
  dialog({
    component: SearchItemDialog,
    componentProps: {
      propCarat: carat.value,
      propColor: color.value,
      propClarity: clarity.value,
      propCut: cut.value,
      propPrice: price.value,
    },
  }).onOk((spec) => {
    carat.value = spec.carat;
    color.value = spec.color;
    clarity.value = spec.clarity;
    cut.value = spec.cut;
    price.value = spec.price;
  });
};
</script>

<style lang="scss" scoped>
.card-label {
  padding: 5px;
}
</style>
