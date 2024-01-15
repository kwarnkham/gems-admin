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

        <q-toolbar-title @click="$router.push({ name: 'home' })">
          Gems Admin
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
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

<script setup></script>
