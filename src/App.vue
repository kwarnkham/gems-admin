<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { api } from "./boot/axios";
import { useAppStore } from "src/stores/app-store";
import useApp from "src/composables/app";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const { removeToken } = useApp();
const { notify, localStorage } = useQuasar();
const router = useRouter();

onMounted(() => {
  if (localStorage.getItem("token"))
    api({
      method: "GET",
      url: "users/me",
    })
      .then(({ data }) => {
        appStore.setUser(data);
      })
      .catch((e) => {
        notify({
          message: e.response?.data?.message || e.message,
          type: "negative",
        });
        removeToken();
        router.replace({
          name: "login",
        });
      });
});
</script>
