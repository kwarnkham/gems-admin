<template>
  <q-file
    :modelValue="modelValue"
    @update:model-value="updateValue"
    :accept="!capture ? '.jpg, image/*' : undefined"
    @rejected="onRejected"
    :multiple="multiple"
    ref="fileInput"
    :capture="capture"
    :max-files="maxFiles"
    borderless
    :label="label"
  >
    <template v-slot:prepend>
      <slot :pickFiles="pickFiles"> </slot>
    </template>
  </q-file>
</template>

<script setup>
import imageCompression from "browser-image-compression";
import { useQuasar } from "quasar";
import { ref } from "vue";

const { loading } = useQuasar();
const props = defineProps({
  modelValue: {
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  maxFiles: {
    type: Number,
    default: 10,
  },
  capture: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    default: "image",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const fileInput = ref(null);
const pickFiles = () => {
  fileInput.value.pickFiles();
};
const emit = defineEmits(["update:modelValue"]);
const onRejected = () => {
  notify({
    message: "Please select image file type",
    type: "warning",
  });
};

const updateValue = (files) => {
  if (!files) {
    emit("update:modelValue", props.multiple ? [] : null);
    return;
  }

  const options = {
    maxSizeMB: 0.9,
  };
  if (props.multiple) {
    if (files.length > 0) loading.show();
    const temp = [];
    files.forEach((imageFile) => {
      // console.log("originalFile instanceof Blob", imageFile instanceof Blob);
      // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          // console.log(
          //   "compressedFile instanceof Blob",
          //   compressedFile instanceof Blob
          // ); // true
          // console.log(
          //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          // ); // smaller than maxSizeMB
          temp.push(compressedFile);
          if (temp.length === files.length) {
            emit("update:modelValue", temp);
            loading.hide();
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  } else {
    loading.show();
    imageCompression(files, options)
      .then(function (compressedFile) {
        emit(
          "update:modelValue",
          new File([compressedFile], compressedFile.name)
        );
        loading.hide();
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
};
</script>

<style scoped lang="scss">
:deep(.q-field__control-container) {
  display: none;
}
</style>
