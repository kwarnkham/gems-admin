<template>
  <q-page padding>
    <q-form @submit.prevent="submit">
      <q-input v-model="name" label="Name" autocomplete="username" autofocus />
      <q-input
        v-model="password"
        label="Password"
        autocomplete="username"
        type="password"
      />
      <div class="text-right">
        <q-btn flat no-caps label="Login" type="submit" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";
import useApp from "src/composables/app";
import { useAppStore } from "src/stores/app-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const name = ref("");
const password = ref("");
const { preserveToken } = useApp();
const appStore = useAppStore();
const router = useRouter();
const { notify } = useQuasar();

const submit = () => {
  api({
    method: "POST",
    url: "login",
    data: {
      name: name.value,
      password: password.value,
    },
  })
    .then(({ data }) => {
      preserveToken(data.token);
      appStore.setUser(data.user);
      router.replace({
        name: "home",
      });
    })
    .catch((e) => {
      console.log(e.message);
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
};
</script>
