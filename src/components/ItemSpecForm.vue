<template>
  <q-form @submit.prevent="submit" class="q-gutter-y-sm" v-if="item">
    <div class="text-center text-h5">{{ title }}</div>
    <div>{{ item.name }}</div>
    <div>{{ item.description }}</div>
    <q-input outlined label="Shape" v-model="shape" />
    <q-input outlined label="Measurements" v-model="measurements" />
    <q-input
      outlined
      label="Carat Weight"
      v-model="caratWeight"
      type="text"
      inputmode="numeric"
      pattern="\d+(\.\d+)?"
    />
    <q-select
      outlined
      label="Color Grade"
      v-model="colorGrade"
      :options="colorGrades"
    />
    <q-select
      outlined
      label="Clarity Grade"
      v-model="clarityGrade"
      :options="clarityGrades"
    />
    <q-select
      outlined
      label="Cut Grade"
      v-model="cutGrade"
      :options="cutGrades"
    />
    <q-input outlined label="Polish" v-model="polish" />
    <q-input outlined label="Symmetry" v-model="symmetry" />
    <q-input outlined label="Fluorescence" v-model="fluorescence" />
    <q-input
      outlined
      label="Clarity Characteristics"
      v-model="clarityCharacteristics"
    />
    <q-input outlined label="Certification" v-model="certification" />
    <q-input outlined label="Origin" v-model="origin" />
    <div class="text-right">
      <q-btn glossy type="submit" label="Submit" no-caps />
    </div>
  </q-form>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import useSpec from "src/composables/spec";
import useUtils from "src/composables/utils";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: "Add Item Specifications",
  },
  item: {
    type: Object,
    default: null,
  },
  update: {
    type: Boolean,
    default: false,
  },
});

const { notify } = useQuasar();
const polish = ref(props.item.specification?.polish ?? "Excellent");
const symmetry = ref(props.item.specification?.symmetry ?? "Excellent");
const fluorescence = ref(props.item.specification?.fluorescence ?? "None");
const clarityCharacteristics = ref(
  props.item.specification?.clarity_characteristics ?? ""
);
const measurements = ref(props.item.specification?.measurements ?? "");
const caratWeight = ref(props.item.specification?.carat_weight ?? "");
const cutGrade = ref(props.item.specification?.cut_grade ?? "");
const clarityGrade = ref(props.item.specification?.clarity_grade ?? "");
const colorGrade = ref(props.item.specification?.color_grade ?? "");
const certification = ref(
  props.item.specification?.certification ?? "GIA " + props.item.name
);
const origin = ref(props.item.specification?.origin ?? "");
const shape = ref(props.item.specification?.shape ?? "");

const { colorGrades, clarityGrades, cutGrades } = useSpec();

const router = useRouter();
const { trimObject } = useUtils();

const submit = () => {
  const data = {
    item_id: props.item.id,
    shape: shape.value,
    measurements: measurements.value,
    carat_weight: caratWeight.value,
    color_grade: colorGrade.value.value,
    clarity_grade: clarityGrade.value.value,
    cut_grade: cutGrade.value.value,
    polish: polish.value,
    symmetry: symmetry.value,
    fluorescence: fluorescence.value,
    clarity_characteristics: clarityCharacteristics.value,
    certification: certification.value,
    origin: origin.value,
  };
  const options = {
    method: "POST",
    url: "specifications",
    data: props.update ? data : trimObject(data),
  };

  if (props.update) {
    options.method = "PUT";
    options.url = `specifications/${props.item.specification.id}`;
  }
  api(options)
    .then(() => {
      if (props.update) router.go(-1);
      else
        router.push({
          name: "add-item-picture",
          params: {
            itemId: props.item.id,
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
