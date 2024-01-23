<template>
  <div class="row no-wrap items-center q-gutter-x-md">
    <q-btn
      icon="keyboard_arrow_left"
      flat
      @click="
        $emit('update:modelValue', Number((modelValue - step).toFixed(1)))
      "
      :disable="modelValue == min"
      rounded
      dense
      color="white"
    />
    <q-slider
      :model-value="modelValue"
      @update:model-value="updateValue"
      :min="min"
      :max="max"
      :step="step"
      label
      label-always
      label-color="primary"
      color="white"
      class="text-primary"
      :label-value="labelValue"
      selection-color="transparent"
    />
    <q-btn
      icon="keyboard_arrow_right"
      flat
      @click="
        $emit('update:modelValue', Number((modelValue + step).toFixed(1)))
      "
      :disable="modelValue == max"
      rounded
      dense
      color="white"
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

const updateValue = (payload) => {
  emit("update:modelValue", payload);
};
</script>
