<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" no-backdrop-dismiss>
    <q-card class="q-dialog-plugin">
      <q-form @submit.prevent="onDialogOK({ mmk, usd })">
        <q-card-section class="q-gutter-y-sm">
          <q-input
            autofocus
            outlined
            v-model="usd"
            required
            type="number"
            inputmode="numeric"
            pattern="\d+(\.\d+)?"
            label="USD"
          />
          <q-input
            outlined
            v-model="mmk"
            type="number"
            inputmode="numeric"
            pattern="\d+(\.\d+)?"
            label="MMK"
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

const mmk = ref("");
const usd = ref("");

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>
