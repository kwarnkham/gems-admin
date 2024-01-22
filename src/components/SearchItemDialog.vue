<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" no-backdrop-dismiss dark>
    <q-card class="q-dialog-plugin">
      <q-form
        @submit.prevent="onDialogOK({ cut, clarity, color, carat, price })"
      >
        <q-card-section class="q-gutter-y-sm">
          <q-input
            autofocus
            outlined
            v-model="carat"
            required
            type="number"
            mode="numeric"
            pattern="[0-9]*"
            label="Carat"
          />
          <q-input outlined v-model="color" label="Color" />
          <q-input outlined v-model="cut" label="Cut" />
          <q-input outlined v-model="clarity" label="Clarity" />

          <q-input
            outlined
            v-model="price"
            type="number"
            mode="numeric"
            pattern="[0-9]*"
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
const cut = ref(props.propCut);
const clarity = ref(props.propClarity);
const carat = ref(props.propCarat);
const color = ref(props.propColor);
const price = ref(props.propPrice);

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
