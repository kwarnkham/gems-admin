<template>
  <q-page padding>
    <q-form @submit.prevent="submit" class="q-gutter-y-sm">
      <div class="text-center text-6">Pre Order</div>
      <q-input label="Name" v-model="name" required />
      <q-input label="Phone" v-model="phone" required type="tel" />
      <q-input label="Category" v-model="category" required />
      <q-input
        label="Price"
        v-model="price"
        required
        type="number"
        mode="numeric"
        pattern="[0-9]*"
      />
      <q-input
        label="Carat"
        v-model="carat"
        required
        type="number"
        mode="numeric"
        pattern="[0-9]*"
      />
      <q-select
        outlined
        label="Color Grade"
        v-model="color"
        :options="colorGrades"
      />
      <q-select
        outlined
        label="Clarity Grade"
        v-model="clarity"
        :options="clarityGrades"
      />
      <q-select outlined label="Cut Grade" v-model="cut" :options="cutGrades" />
      <q-input label="Shape" v-model="shape" required />
      <div class="text-right">
        <q-btn icon="save" glossy type="submit" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import useSpec from "src/composables/spec";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AddItemPage from "./AddItemPage.vue";

const { colorGrades, clarityGrades, cutGrades } = useSpec();
const router = useRouter();

const name = ref("");
const phone = ref("");
const category = ref("");
const price = ref("");
const shape = ref("");
const color = ref("");
const carat = ref("");
const clarity = ref("");
const cut = ref("");
const submit = () => {
  api({
    url: "pre-orders",
    method: "POST",
    data: {
      name: name.value,
      phone: phone.value,
      category: category.value,
      price: price.value,
      shape: shape.value,
      color: color.value.value,
      carat: carat.value,
      clarity: clarity.value.value,
      cut: cut.value.value,
    },
  }).then(({ data }) => {
    router.push({
      name: "pre-order-details",
      params: {
        id: data.id,
      },
    });
  });
};
</script>
