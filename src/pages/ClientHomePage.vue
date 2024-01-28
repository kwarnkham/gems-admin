<template>
  <q-page>
    <q-img src="~/assets/4Cs-diamonds.jpg" />
    <div class="q-pa-md text-indigo-9">
      <div class="text-weight-bold text-subtitle1">THE 4Cs OF</div>
      <div class="text-weight-bolder text-h5">Diamond Quality</div>
      <div class="text-overline">
        The universal method for assessing the quality of any diamond, anywhere
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
    <div class="row justify-between">
      <div
        class="col-6 q-pa-sm"
        @click="
          $router.push({
            name: 'tool',
            query: {
              name: 'color',
            },
          })
        "
      >
        <q-img src="~/assets/color-tool.png" fit="contain" />
        <div class="text-center text-grey-2">COLOR</div>
      </div>
      <div
        class="col-6 q-pa-sm"
        @click="
          $router.push({
            name: 'tool',
            query: {
              name: 'clarity',
            },
          })
        "
      >
        <q-img src="~/assets/clarity-tool.png" fit="contain" />
        <div class="text-center text-grey-2">CLARITY</div>
      </div>
      <div
        class="col-6 q-pa-sm"
        @click="
          $router.push({
            name: 'tool',
            query: {
              name: 'cut',
            },
          })
        "
      >
        <q-img src="~/assets/cut-tool.png" fit="contain" />
        <div class="text-center text-grey-2">CUT</div>
      </div>
      <div
        class="col-6 q-pa-sm"
        @click="
          $router.push({
            name: 'tool',
            query: {
              name: 'carat',
            },
          })
        "
      >
        <q-img src="~/assets/carat-tool.png" fit="contain" />
        <div class="text-center text-grey-2">CARAT</div>
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
