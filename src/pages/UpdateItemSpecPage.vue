<template>
  <q-page padding v-if="item">
    <ItemSpecForm title="Update Item Specification" :item="item" update />
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import ItemSpecForm from "src/components/ItemSpecForm.vue";
import { onMounted } from "vue";
import { ref } from "vue";
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
