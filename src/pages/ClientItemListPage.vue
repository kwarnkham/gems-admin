<template>
  <q-page padding v-if="pagination" class="column no-wrap" v-scroll="fetchMore">
    <template v-if="pagination.data.length > 0">
      <div class="q-pa-sm col" v-for="item in pagination.data" :key="item.id">
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
      <div class="text-center full-width" v-if="fetching">
        <q-spinner-dots size="md" color="white" />
      </div>
    </template>
    <div v-else class="fit flex flex-center">
      <q-spinner-dots color="white" size="xl" class="q-mt-md" />
    </div>
    <FloatingActionButton
      icon="search"
      color="info"
      @click.stop="showSearchDialog"
      :opacity="0.7"
    />
  </q-page>
  <q-page v-else class="flex flex-center">
    <q-spinner-ios color="primary" size="xl" />
  </q-page>
</template>

<script setup>
import FloatingActionButton from "src/components/FloatingActionButton.vue";
import { debounce, useQuasar } from "quasar";
import usePagination from "src/composables/pagination";
import SearchItemDialog from "src/components/SearchItemDialog.vue";
import useUtils from "src/composables/utils";

const { dialog, localStorage } = useQuasar();
const { isScrollEndByBody } = useUtils();
const params = {
  per_page: 10,
  status: 1,
};
const { pagination, updateQueryAndFetch, fetching, currentPage } =
  usePagination({
    url: "items",
    append: true,
    params,
  });

const fetchMore = debounce((position) => {
  if (isScrollEndByBody(position)) {
    if (pagination.value.last_page > currentPage.value) currentPage.value += 1;
  }
}, 500);

const showSearchDialog = () => {
  dialog({
    component: SearchItemDialog,
  }).onOk((spec) => {
    if (spec.carat) localStorage.set("caratSearch", spec.carat);
    if (spec.colorGrade) localStorage.set("colorSearch", spec.colorGrade);
    if (spec.clarityGrade) localStorage.set("claritySearch", spec.clarityGrade);
    if (spec.cutGrade) localStorage.set("cutSearch", spec.cutGrade);
    if (spec.price) localStorage.set("priceSearch", spec.price);
    pagination.value.data = [];
    updateQueryAndFetch({
      ...params,
      carat: spec.carat,
      clarity: spec.clarityGrade?.value,
      price: spec.price,
      cut: spec.cutGrade?.value,
      color: spec.colorGrade?.value,
    });
  });
};
</script>

<style lang="scss" scoped>
.card-label {
  padding: 5px;
}
</style>
