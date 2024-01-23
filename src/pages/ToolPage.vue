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

        <div class="row no-wrap items-center">
          <q-btn
            icon="remove"
            flat
            @click="colorGrade -= 1"
            :disable="colorGrade == 1"
          />
          <q-slider
            v-model="colorGrade"
            :min="1"
            :max="colorGrades[colorGrades.length - 1].value"
            :step="1"
            label
            label-always
            color="primary"
            :label-value="colorGrades.find((e) => e.value == colorGrade).label"
          />
          <q-btn
            icon="add"
            flat
            @click="colorGrade += 1"
            :disable="colorGrade == colorGrades[colorGrades.length - 1].value"
          />
        </div>
      </q-tab-panel>
      <q-tab-panel name="clarity">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import useApp from "src/composables/app";
import useSpec from "src/composables/spec";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const tab = ref(route.query.name ?? "color");
const { vhPage } = useApp();
const { colorGrades } = useSpec();
const colorGrade = ref(1);

const getColorGradeImage = (cGrade) => {
  return `/color-grade-${cGrade.label.toLowerCase()}.jpeg`;
};
</script>

<style scoped lang="scss">
.image {
  clip-path: circle(25% at 50% 35%);
}
</style>
