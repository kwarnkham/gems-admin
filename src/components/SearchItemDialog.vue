<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" no-backdrop-dismiss dark>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-center text-h6">Set you maximum</div>
      </q-card-section>
      <q-form
        @submit.prevent="
          onDialogOK({ cutGrade, clarityGrade, colorGrade, carat, price })
        "
      >
        <q-card-section class="q-gutter-y-sm">
          <q-input
            autofocus
            outlined
            v-model="carat"
            type="number"
            mode="numeric"
            pattern="\d*"
            label="Carat"
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

          <q-input
            outlined
            v-model="price"
            type="number"
            mode="numeric"
            pattern="\d*"
            label="Price"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Cancel"
            @click="onDialogCancel"
            no-caps
          />
          <q-btn color="primary" label="Ok" type="submit" no-caps />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import useSpec from "src/composables/spec";
import { ref } from "vue";

const props = defineProps({
  propCut: {
    type: String,
    default: "",
  },
  propColor: {
    type: String,
    default: "",
  },
  propClarity: {
    type: String,
    default: "",
  },
  propCarat: {
    type: String,
    default: "",
  },
  propPrice: {
    type: String,
    default: "",
  },
});
const cutGrade = ref(props.propCut);
const clarityGrade = ref(props.propClarity);
const carat = ref(props.propCarat);
const colorGrade = ref(props.propColor);
const price = ref(props.propPrice);

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const { colorGrades, cutGrades, clarityGrades } = useSpec();
</script>
