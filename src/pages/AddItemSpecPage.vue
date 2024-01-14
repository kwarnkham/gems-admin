<template>
  <q-page padding v-if="item">
    <ItemSpecForm :item="item" />
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import ItemSpecForm from "src/components/ItemSpecForm.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const item = ref(null);
const { notify } = useQuasar();

onMounted(() => {
  api({
    method: "GET",
    url: `items/${route.params.itemId}`,
  })
    .then(({ data }) => {
      item.value = data;
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
});
</script>
