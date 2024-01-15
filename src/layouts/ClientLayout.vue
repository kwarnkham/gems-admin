<template>
  <q-layout view="hHh Lpr fFf">
    <q-footer>
      <q-tabs
        active-color="white"
        active-bg-color="black"
        indicator-color="white"
      >
        <q-route-tab
          :to="{ name: 'client-item-list' }"
          replace
          label="One Tab"
          no-caps
        />
        <q-route-tab
          :to="{ name: 'client-item-details' }"
          replace
          label="Other Tab"
          no-caps
        />
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

<script setup></script>

<style scoped lang="scss">
.page {
  background-image: linear-gradient(to bottom, #142233, #fff, #142233);
}
</style>
