<template>
  <div class="row no-wrap items-center q-gutter-x-md">
    <q-btn
      icon="remove"
      flat
      @click="$emit('update:modelValue', modelValue - 1)"
      :disable="modelValue == min"
      rounded
      dense
    />
    <q-slider
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event.target.value)"
      :min="min"
      :max="max"
      :step="step"
      label
      label-always
      color="primary"
      :label-value="labelValue"
    />
    <q-btn
      icon="add"
      flat
      @click="$emit('update:modelValue', modelValue + 1)"
      :disable="modelValue == max"
      rounded
      dense
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  labelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
