<template>
  <q-page>
    <q-img src="~/assets/4Cs-diamonds.jpg" />
    <div class="q-pa-md text-indigo-9">
      <div class="text-weight-bold text-subtitle1">THE 4Cs OF</div>
      <div class="text-weight-bolder text-h5">Diamond Quality</div>
      <div class="text-overline">
        The universal method for assessing the quality of any diamond, anywhwre
        in the word.
      </div>
      <q-btn
        no-caps
        dense
        outline
        color="primary"
        @click="$router.push({ name: '4cs' })"
        >Read more</q-btn
      >
    </div>
    <div class="row">
      <div class="q-pa-md"></div>
    </div>
  </q-page>
</template>

<script setup></script>
