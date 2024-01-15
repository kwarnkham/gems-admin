<template>
  <q-page padding>
    <q-form @submit.prevent="submit" class="q-gutter-y-sm" v-if="item">
      <div class="text-center text-h5">Add Item Pictures</div>
      <div>Name : {{ item.name }}</div>
      <div>Description : {{ item.description }}</div>
      <div v-if="item.specification?.carat">
        Carat : {{ item.specification?.carat }}
      </div>
      <div v-if="item.specification?.cut">
        Cut : {{ item.specification?.cut }}
      </div>
      <div v-if="item.specification?.color">
        Color : {{ item.specification?.color }}
      </div>
      <div v-if="item.specification?.certification">
        Certification : {{ item.specification?.certification }}
      </div>
      <div v-if="item.specification?.shape">
        Shape : {{ item.specification?.shape }}
      </div>
      <div v-if="item.specification?.origin">
        Origin : {{ item.specification?.origin }}
      </div>
      <FileInput v-model="pictures" multiple v-slot="{ pickFiles }">
        <q-btn
          flat
          no-caps
          label="Select from device"
          @click="pickFiles"
          color="primary"
        />
      </FileInput>
      <div class="row q-gutter-y-sm" v-if="pictures.length">
        <q-card
          class="q-pa-sm col-12 relative-position"
          v-for="(preview, key) in previews"
          :key="key"
        >
          <q-card-section>
            <q-img :src="preview" fit="contain" />
          </q-card-section>
          <q-btn
            icon="close"
            class="absolute-top-right"
            round
            color="info"
            @click="removePicture(key)"
          />
        </q-card>
      </div>

      <div class="text-right">
        <q-btn glossy type="submit" label="Submit" no-caps />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import FileInput from "src/components/FileInput.vue";
import { watch } from "vue";
import useUtils from "src/composables/utils";

const route = useRoute();
const { notify, dialog } = useQuasar();
const item = ref(null);
const pictures = ref([]);
const previews = ref([]);
const { buildForm } = useUtils();
const router = useRouter();

const removePicture = (key) => {
  dialog({
    title: "Confirm",
    message: "Do you want to remove the picture?",
    cancel: true,
    noBackdropDismiss: true,
  }).onOk(() => {
    pictures.value.splice(key, 1);
  });
};

watch(
  pictures,
  () => {
    if (pictures.value.length == 0) return;
    previews.value = [];
    pictures.value.forEach((picture) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.value.push(e.target.result);
      };
      reader.readAsDataURL(picture);
    });
  },
  { deep: true }
);

const submit = () => {
  if (pictures.value.length < 1) {
    notify({
      message: "Please select at least one picture",
      type: "negative",
    });
    return;
  }

  api({
    method: "POST",
    url: `items/${item.value.id}/pictures`,
    data: buildForm({
      pictures: pictures.value,
    }),
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(() => {
      router.push({
        name: "item-details",
        params: {
          id: item.value.id,
        },
      });
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
};
onMounted(() => {
  api({
    method: "GET",
    url: `items/${route.params.itemId}`,
  })
    .then(({ data }) => {
      item.value = data;
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
});
</script>
