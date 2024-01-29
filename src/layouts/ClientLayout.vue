<template>
  <q-layout view="hHh Lpr fFf">
    <q-footer>
      <q-tabs
        active-color="white"
        active-bg-color="black"
        indicator-color="white"
        class="row justify-evenly no-wrap"
      >
        <q-route-tab
          class="col-3"
          :to="{ name: 'client-home' }"
          replace
          icon="home"
          no-caps
        />
        <q-route-tab
          class="col-3"
          :to="{ name: 'client-item-list' }"
          replace
          icon="img:/diamond.png"
          no-caps
        />
        <q-route-tab
          class="col-3"
          :to="{ name: 'contact' }"
          replace
          icon="support_agent"
          no-caps
        />
        <q-btn
          stretch
          icon="translate"
          @click.stop="chooseLanguage"
          name="lang"
          flat
          class="col-3"
          size="md"
        >
        </q-btn>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear enter-active-class="animated fadeIn">
          <component :is="Component" class="page" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import useLocale from "src/composables/locale";

const { dialog } = useQuasar();
const { langOptions, language } = useLocale();
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

<style scoped lang="scss">
.page {
  background-image: linear-gradient(to bottom, #142233, #fff, #142233);
}
:deep(.q-footer) {
  .q-icon {
    img {
      filter: invert(1);
    }
  }
}
</style>
