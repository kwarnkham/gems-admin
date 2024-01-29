<template>
  <q-page>
    <q-img src="~/assets/4Cs-diamonds.jpg" />
    <div class="q-pa-md text-indigo-9">
      <template v-if="locale == 'zh-CN'">
        <div class="text-weight-bold text-subtitle1">4C 标准</div>
        <div class="text-weight-bolder text-h5">钻石品质</div>
      </template>
      <template v-else-if="locale == 'mm'">
        <div class="text-weight-bold text-subtitle1">4Cs</div>
        <div class="text-weight-bolder text-h5">စိန်အရည်အသွေး</div>
      </template>
      <template v-else>
        <div class="text-weight-bold text-subtitle1">THE 4Cs OF</div>
        <div class="text-weight-bolder text-h5">Diamond Quality</div>
      </template>
      <div class="text-overline" v-if="locale == 'zh-CN'">
        用于评估世界任何地方任何钻石质量的通用方法。
      </div>
      <div class="text-overline" v-else-if="locale == 'mm'">
        ကမ္ဘာပေါ်ရှိ မည်သည့်စိန်၏ အရည်အသွေးကိုမဆို အကဲဖြတ်ရန် တကမ္ဘာလုံးသုံး
        နည်းလမ်း
      </div>
      <div class="text-overline" v-else>
        The universal method for assessing the quality of any diamond, anywhere
        in the world.
      </div>
      <q-btn
        no-caps
        dense
        outline
        color="primary"
        @click="$router.push({ name: '4cs' })"
        >{{ $t("readMore") }}</q-btn
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
        <div class="text-center text-grey-2">{{ $t("color") }}</div>
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
        <div class="text-center text-grey-2">{{ $t("clarity") }}</div>
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
        <div class="text-center text-grey-2">{{ $t("cut") }}</div>
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
        <div class="text-center text-grey-2">{{ $t("carat") }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import useLocale from "src/composables/locale";

const { locale } = useLocale();
</script>
