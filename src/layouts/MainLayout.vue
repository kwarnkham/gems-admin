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

        <q-btn icon="img:icons/us.png" flat @click="chooseLanguage" />
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
import { watch } from "vue";

const { dialog, lang } = useQuasar();
const appLanguages = languages.filter((lang) =>
  ["en-US", "zh-CN", "mm"].includes(lang.isoName)
);
const langOptions = appLanguages.map((lang) => ({
  label: lang.nativeName,
  value: lang.isoName,
}));

watch(language, (val) => {
  import(
    /* webpackInclude: /(mm|en-US|zh-CN)\.js$/ */
    "quasar/lang/" + val
  ).then((language) => {
    lang.set(language.default);
  });
});

const language = ref(lang.isoName);
const chooseLanguage = () => {
  dialog({
    noBackdropDismiss: true,
    options: {
      type: "radio",
      model: "en-US",
      items: [
        { label: "English", value: "en-US" },
        { label: "中文", value: "zh-CN" },
        { label: "မြန်မာ", value: "mm" },
      ],
    },
  }).onOk((val) => {
    console.log(val);
  });
};
</script>
