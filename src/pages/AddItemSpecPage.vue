<template>
  <q-page padding>
    <q-form @submit.prevent="submit" class="q-gutter-y-sm" v-if="item">
      <div class="text-center text-h5">Add Item Specifications</div>
      <div>{{ item.name }}</div>
      <div>{{ item.description }}</div>
      <q-input outlined label="Carat" v-model="carat" required />
      <q-input outlined label="Cut" v-model="cut" />
      <q-input outlined label="Clarity" v-model="clarity" />
      <q-input outlined label="Color" v-model="color" />
      <q-input outlined label="Certification" v-model="certification" />
      <q-input outlined label="Shape" v-model="shape" />
      <q-input outlined label="Origin" v-model="origin" />
      <div class="text-right">
        <q-btn glossy type="submit" label="Submit" no-caps />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const item = ref(null);
const { notify } = useQuasar();
const carat = ref();
const cut = ref();
const clarity = ref();
const color = ref();
const certification = ref();
const origin = ref();
const shape = ref();
const router = useRouter();

const submit = () => {
  api({
    method: "POST",
    url: "specifications",
    data: {
      item_id: item.value.id,
      carat: carat.value,
      cut: cut.value,
      clarity: clarity.value,
      color: color.value,
      certification: certification.value,
      origin: origin.value,
      shape: shape.value,
    },
  })
    .then(({ data }) => {
      router.push({
        name: "add-item-picture",
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
