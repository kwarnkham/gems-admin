<template>
  <q-page padding v-if="item">
    <ItemForm title="Update Item" :item="item" />
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import ItemForm from "src/components/ItemForm.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const item = ref(null);
const { notify } = useQuasar();
const route = useRoute();

onMounted(() => {
  api({
    method: "GET",
    url: `items/${route.params.id}`,
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
