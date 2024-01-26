<template>
  <q-page padding v-if="preOrder">
    <template v-for="key in Object.keys(preOrder)" :key="key">
      <div
        class="capitalize"
        v-if="
          !['created_at', 'updated_at', 'id', 'contact_id', 'contact'].includes(
            key
          )
        "
      >
        {{ key.split("_").join(" ") }} : {{ preOrder[key] }}
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const preOrder = ref(null);
const { notify } = useQuasar;

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
