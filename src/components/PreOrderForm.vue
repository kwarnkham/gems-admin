<template>
  <q-form @submit.prevent="submit" class="q-gutter-y-sm">
    <div class="text-center text-6">Pre Order</div>
    <q-input label="Name" v-model="name" required :disable="name != ''" />
    <q-input
      label="Phone"
      v-model="phone"
      required
      type="tel"
      :disable="phone != ''"
    />
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
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import useSpec from "src/composables/spec";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  preOrder: {
    type: Object,
    required: false,
    default: null,
  },
});

const { colorGrades, clarityGrades, cutGrades } = useSpec();
const router = useRouter();
const { notify } = useQuasar();

const name = ref(props.preOrder?.contact?.name ?? "");
const phone = ref(props.preOrder?.contact?.phone ?? "");
const category = ref(props.preOrder?.category ?? "");
const price = ref(props.preOrder?.price ?? "");
const shape = ref(props.preOrder?.shape ?? "");
const color = ref(
  props.preOrder?.color
    ? colorGrades.find((e) => e.value == props.preOrder.color)
    : ""
);
const carat = ref(props.preOrder?.carat ?? "");
const clarity = ref(
  props.preOrder?.clarity
    ? clarityGrades.find((e) => e.value == props.preOrder.clarity)
    : ""
);
const cut = ref(
  props.preOrder?.cut
    ? cutGrades.find((e) => e.value == props.preOrder.cut)
    : ""
);

const submit = () => {
  const options = {
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
  };
  if (props.preOrder) {
    options.url = `pre-orders/${props.preOrder.id}`;
    options.method = "PUT";
  }
  api(options).then(({ data }) => {
    if (props.preOrder) {
      notify({
        message: "Updated",
        type: "positive",
      });
    } else
      router.replace({
        name: "pre-order-details",
        params: {
          id: data.id,
        },
      });
  });
};
</script>
