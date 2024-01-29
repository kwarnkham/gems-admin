<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="keyboard_arrow_left"
          aria-label="Back"
          @click="$router.go(-1)"
          :class="{ invisible: $route.name == 'home' }"
        />

        <q-toolbar-title>
          <span @click="$router.push({ name: 'home' })">Gems Admin</span>
        </q-toolbar-title>

        <q-btn
          flat
          @click="
            $router.push({
              name: 'add-item',
            })
          "
          no-caps
          icon="add"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear enter-active-class="animated fadeIn">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import useLocale from "src/composables/locale";

const { dialog } = useQuasar();
const { language, langOptions } = useLocale();

const chooseLanguage = () => {
  dialog({
    noBackdropDismiss: true,
    options: {
      type: "radio",
      model: language.value,
      items: langOptions,
    },
  }).onOk((val) => {
    language.value = val;
  });
};
</script>
