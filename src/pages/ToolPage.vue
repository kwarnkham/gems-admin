<template>
  <q-page padding class="column" :style-fn="vhPage">
    <q-tabs v-model="tab" class="text-grey-1" active-color="warning">
      <q-tab name="color" label="color" />
      <q-tab name="clarity" label="clarity" />
      <q-tab name="cut" label="cut" />
      <q-tab name="carat" label="carat" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="bg-transparent col" keep-alive>
      <q-tab-panel
        name="color"
        class="full-height column relative-position justify-end"
      >
        <q-img
          v-for="cGrade in colorGrades"
          :key="cGrade.label"
          :src="getColorGradeImage(cGrade)"
          class="image absolute-center"
          :class="{ 'z-max': colorGrade == cGrade.value }"
          height="450px"
          fit="contain"
        />

        <AppSlider
          :min="1"
          :max="colorGrades.length"
          :step="1"
          v-model="colorGrade"
          :label-value="colorGrades.find((e) => e.value == colorGrade).label"
        />
      </q-tab-panel>

      <q-tab-panel
        name="clarity"
        class="full-height column relative-position justify-end"
      >
        <q-img
          v-for="clarity in clarityGrades"
          :key="clarity.label"
          :src="getClarityGradeImage(clarity)"
          class="image absolute-center scale-up"
          :class="{ 'z-max': clarityGrade == clarity.value }"
          height="450px"
          fit="contain"
        />

        <AppSlider
          :min="1"
          :max="clarityGrades.length"
          :step="1"
          v-model="clarityGrade"
          :label-value="
            clarityGrades.find((e) => e.value == clarityGrade).label
          "
        />
      </q-tab-panel>

      <q-tab-panel
        name="cut"
        class="full-height column relative-position justify-end"
      >
        <q-img
          v-for="cut in cutGrades"
          :key="cut.label"
          :src="getCutGradeImage(cut)"
          class="cut-image absolute-center"
          :class="{ 'z-max': cutGrade == cut.value }"
          height="450px"
          fit="contain"
        />

        <AppSlider
          :min="1"
          :max="cutGrades.length"
          :step="1"
          v-model="cutGrade"
          :label-value="cutGrades.find((e) => e.value == cutGrade).label"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import AppSlider from "src/components/AppSlider.vue";
import useApp from "src/composables/app";
import useSpec from "src/composables/spec";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const tab = ref(route.query.name ?? "color");
const { vhPage } = useApp();
const { colorGrades, clarityGrades, cutGrades } = useSpec();
const colorGrade = ref(1);
const clarityGrade = ref(1);
const cutGrade = ref(1);

const getColorGradeImage = (cGrade) => {
  return `/color-grade-${cGrade.label.toLowerCase()}.jpeg`;
};

const getClarityGradeImage = (clarity) => {
  return `/clarity-grade-${clarity.label.toLowerCase()}.jpeg`;
};

const getCutGradeImage = (cut) => {
  return `/cut-grade-${cut.label.split(" ").join("-").toLowerCase()}.jpeg`;
};
</script>

<style scoped lang="scss">
.image {
  clip-path: circle(104px at 50% 33%);
}

.scale-up:deep(.q-img__image) {
  transform: translate(0px, 55px) scale(2);
}

.cut-image {
  clip-path: inset(70px 93px 257px 96px round 20px);
}
</style>
