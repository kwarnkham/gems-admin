<template>
  <q-page-sticky :offset="offset">
    <q-btn :style="{ opacity: opacity }" v-bind="$attrs" :color="color" />
  </q-page-sticky>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "primary",
  },
  opacity: {
    type: Number,
    default: 0.5,
  },
  offset: {
    type: Array,
    default: () => [18, 18],
  },
});

// const emit = defineEmits(["click"]);
</script>
