<template>
  <q-page padding>
    <q-form @submit.prevent="submit" class="q-gutter-y-sm">
      <div class="text-center text-h5">Add Item</div>
      <q-input outlined label="Name" v-model="name" required autofocus />
      <q-input outlined label="Description" v-model="description" required />
      <div class="text-right">
        <q-btn glossy type="submit" label="Submit" no-caps />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const description = ref("");
const router = useRouter();
const { notify } = useQuasar();

const submit = () => {
  api({
    method: "POST",
    url: "items",
    data: {
      name: name.value,
      description: description.value,
    },
  })
    .then(({ data }) => {
      router.push({
        name: "add-item-spec",
        params: {
          itemId: data.id,
        },
      });
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
};
</script>
