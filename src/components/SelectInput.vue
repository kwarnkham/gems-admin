<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="updateValue"
    :options="options"
    option-label="name"
    option-value="id"
    :label="label"
    :multiple="multiple"
    outlined
    popup-content-class="text-grey"
  >
    <template v-slot:after>
      <q-btn icon="add" round color="primary" @click="addNewCategory" />
    </template>
  </q-select>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onMounted } from "vue";
import { ref } from "vue";

const { dialog } = useQuasar();
const props = defineProps({
  modelValue: {
    required: true,
  },
  label: {
    type: String,
    default: "Select",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  resource: {
    type: String,
    required: true,
  },
});

const addNewCategory = () => {
  dialog({
    title: "Add a new category",
    noBackdropDismiss: true,
    cancel: true,
    prompt: {
      label: "Name",
      model: "",
      isValid: (val) => val != "" && !!val,
    },
  }).onOk((category) => {
    api({
      method: "POST",
      url: props.resource,
      data: {
        name: category,
      },
    }).then(({ data }) => {
      options.value.push(data);
    });
  });
};
const emit = defineEmits(["update:modelValue"]);

const updateValue = (payload) => {
  emit("update:modelValue", payload);
};

const options = ref([]);

onMounted(() => {
  api({
    method: "GET",
    url: props.resource,
  }).then(({ data }) => {
    options.value = data;
  });
});
</script>
