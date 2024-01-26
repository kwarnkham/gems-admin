<template>
  <q-page padding v-if="preOrder">
    <PreOrderForm :pre-order="preOrder" />
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import PreOrderForm from "src/components/PreOrderForm.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const preOrder = ref(null);
const { notify } = useQuasar();

onMounted(() => {
  api({
    method: "GET",
    url: `pre-orders/${route.params.id}`,
  })
    .then(({ data }) => {
      preOrder.value = data;
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
});
</script>
