<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" dark>
    <q-card class="q-dialog-plugin bg-grey-2">
      <div class="full-width"><canvas id="quality"></canvas></div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import {
  Chart,
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";
import { computed } from "vue";

Chart.register(
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  Filler
);

const { t } = useI18n();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const props = defineProps({
  colorGrade: {
    type: Number,
    required: true,
  },
  clarityGrade: {
    type: Number,
    required: true,
  },
  cutGrade: {
    type: Number,
    required: true,
  },
  polishGrade: {
    type: Number,
    required: true,
  },
  symmetryGrade: {
    type: Number,
    required: true,
  },
});
const colorScore = computed(() => {
  return Math.abs(props.colorGrade - 18);
});

const clarityScore = computed(() => {
  return (Math.abs(props.clarityGrade - 12) * 17) / 11;
});

const cutScore = computed(() => {
  return (Math.abs(props.cutGrade - 6) * 17) / 5;
});

const polishScore = computed(() => {
  return (Math.abs(props.polishGrade - 6) * 17) / 5;
});

const symmetryScore = computed(() => {
  return (Math.abs(props.symmetryGrade - 6) * 17) / 5;
});

onMounted(() => {
  setTimeout(() => {
    const data = {
      labels: [t("color"), t("clarity"), t("cut"), t("symmetry"), t("polish")],
      datasets: [
        {
          data: [
            colorScore.value,
            clarityScore.value,
            cutScore.value,
            symmetryScore.value,
            polishScore.value,
          ],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
      ],
    };
    const el = document.getElementById("quality");
    new Chart(el, {
      type: "radar",
      data: data,
      options: {
        scales: {
          r: {
            ticks: {
              display: false,
            },
            angleLines: {
              display: true,
            },
            suggestedMin: 1,
            suggestedMax: 17,
          },
        },
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
    });
  }, 0);
});
</script>
