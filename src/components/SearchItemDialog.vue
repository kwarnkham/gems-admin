<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" no-backdrop-dismiss dark>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-center text-h6">{{ $t("set_your_maximum") }}</div>
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
            inputmode="numeric"
            pattern="\d+(\.\d+)?"
            :label="$t('caratWeight')"
          />
          <q-select
            outlined
            :label="$t('colorGrade')"
            v-model="colorGrade"
            :options="colorGrades"
          />
          <q-select
            outlined
            :label="$t('clarityGrade')"
            v-model="clarityGrade"
            :options="clarityGrades"
          />
          <q-select
            outlined
            :label="$t('cutGrade')"
            v-model="cutGrade"
            :options="cutGrades"
          />

          <q-input
            outlined
            v-model="price"
            type="number"
            inputmode="numeric"
            pattern="\d+(\.\d+)?"
            :label="$t('price')"
            placeholder="USD"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" icon="sym_o_mop" @click="clear" no-caps />
          <q-btn
            color="primary"
            :label="$t('cancel')"
            @click="onDialogCancel"
            no-caps
          />
          <q-btn color="primary" :label="$t('ok')" type="submit" no-caps />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import useSpec from "src/composables/spec";
import { ref } from "vue";

const { localStorage } = useQuasar();

const cutGrade = ref(localStorage.getItem("cutSearch") ?? null);
const clarityGrade = ref(localStorage.getItem("claritySearch") ?? null);
const carat = ref(localStorage.getItem("caratSearch") ?? "");
const colorGrade = ref(localStorage.getItem("colorSearch") ?? null);
const price = ref(localStorage.getItem("priceSearch") ?? "");

const clear = () => {
  localStorage.remove("cutSearch");
  localStorage.remove("claritySearch");
  localStorage.remove("caratSearch");
  localStorage.remove("colorSearch");
  localStorage.remove("priceSearch");

  cutGrade.value = null;
  clarityGrade.value = null;
  carat.value = "";
  colorGrade.value = null;
  price.value = "";

  onDialogOK({
    cutGrade: cutGrade.value,
    clarityGrade: clarityGrade.value,
    colorGrade: colorGrade.value,
    carat: carat.value,
    price: price.value,
  });
};

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const { colorGrades, cutGrades, clarityGrades } = useSpec();
</script>
