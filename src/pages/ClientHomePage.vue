<template>
  <q-page class="relative-position">
    <div
      class="ad-container row no-wrap"
      :class="{ stop: !moving }"
      @click="moving = !moving"
    >
      <q-img src="~/assets/ad1.png" class="col-12" />
      <q-img src="~/assets/ad2.png" class="col-12" />
      <q-img src="~/assets/ad3.png" class="col-12" />
      <q-img src="~/assets/4Cs-diamonds.jpg" class="col-12" />
    </div>

    <div
      class="ad-container-make-up row no-wrap absolute-top"
      :class="{ stop: !moving }"
      @click="moving = !moving"
    >
      <q-img src="~/assets/ad1.png" class="col-12" />
      <q-img src="~/assets/ad2.png" class="col-12" />
      <q-img src="~/assets/ad3.png" class="col-12" />
      <q-img src="~/assets/4Cs-diamonds.jpg" class="col-12" />
    </div>

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
import { ref } from "vue";

const { locale } = useLocale();
const moving = ref(true);
</script>

<style lang="scss" scoped>
.stop {
  .q-img {
    animation-play-state: paused !important;
  }
}
.ad-container {
  overflow: hidden;
  .q-img {
    animation: moveRightToLeft 8s linear infinite;
  }
}
@keyframes moveRightToLeft {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-300%);
  }
}

.ad-container-make-up {
  overflow: hidden;
  .q-img {
    animation: moveRightToLeft2 8s linear infinite;
  }
}
@keyframes moveRightToLeft2 {
  from {
    transform: translateX(300%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>
