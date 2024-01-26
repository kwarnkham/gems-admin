<template>
  <q-page padding v-if="setting">
    <q-form @submit.prevent="submit">
      <div class="text-center text-h5">Settings</div>
      <template v-for="key in Object.keys(setting)" :key="key">
        <q-input
          class="capitalize"
          :label="key.split('_').join(' ')"
          v-if="!['created_at', 'id', 'updated_at'].includes(key)"
          v-model="setting[key]"
        />
      </template>
      <div class="text-right">
        <q-btn type="submit" label="Update" no-caps flat />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useAppStore } from "src/stores/app-store";
import { onMounted } from "vue";
import { ref } from "vue";

const appStore = useAppStore();
const setting = ref(
  appStore.getAppSetting != null
    ? JSON.parse(JSON.stringify(appStore.getAppSetting))
    : null
);
const { notify } = useQuasar();

const submit = () => {
  api({
    method: "PUT",
    url: `app-settings/${setting.value.id}`,
    data: setting.value,
  })
    .then(({ data }) => {
      setting.value = data;
      appStore.setAppSetting(data);
      notify({
        message: "Updated",
        type: "positive",
        timeout: 1000,
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
  setTimeout(() => {
    setting.value = JSON.parse(JSON.stringify(appStore.getAppSetting));
  }, 500);
});
</script>
