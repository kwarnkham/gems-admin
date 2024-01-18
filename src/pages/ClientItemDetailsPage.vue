<template>
  <q-page v-if="item" class="column bg-black q-px-xs" :style-fn="vhPage">
    <q-carousel
      height="280px"
      swipeable
      animated
      v-model="slide"
      v-model:fullscreen="fullscreen"
      infinite
      :autoplay="5500"
      thumbnails
      class="rounded-borders bg-black"
    >
      <q-carousel-slide
        v-for="picture in item.pictures"
        :key="picture.id"
        :name="picture.id"
        :img-src="picture.name"
      >
        <!-- <q-img class="rounded-borders" :src="picture.name" /> -->
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
    <div class="info col column">
      <div class="spotlight">
        <div class="row price justify-between">
          <div>
            {{ item.name }}
          </div>
          <div class="text-right">
            <q-btn
              v-if="item.active_prices[0]"
              class="pointer-none"
              flat
              text-color="white"
              :label="`MMK ${item.active_prices[0].mmk.toLocaleString()}`"
            >
              <q-badge floating>{{
                new Date(item.active_prices[0].created_at).toLocaleString(
                  "en-GB",
                  { hour12: true }
                )
              }}</q-badge>
            </q-btn>
            <div v-else>
              <q-btn
                flat
                text-color="white"
                no-caps
                :label="'Contact for price'"
                icon="info"
                dense
              >
              </q-btn>
            </div>
          </div>
        </div>
        <div class="q-mt-sm">
          {{ item.description }}
        </div>
      </div>
      <div class="text-h5 q-my-sm full-width text-white text-center">
        Specification
      </div>
      <div class="row text-white col justify-between q-px-md">
        <template v-for="key in Object.keys(item.specification)">
          <div
            :key="key"
            v-if="
              item.specification[key] &&
              !['created_at', 'updated_at', 'id', 'item_id'].includes(key)
            "
            class="spec col-6"
          >
            <div class="capitalize">{{ key }}</div>
            <div class="text-weight-bolder">{{ item.specification[key] }}</div>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import useApp from "src/composables/app";

const route = useRoute();
const item = ref(null);
const slide = ref(1);
const fullscreen = ref(false);
const { notify } = useQuasar();
const { vhPage } = useApp();

onMounted(() => {
  api({
    method: "GET",
    url: `items/${route.params.id}`,
  })
    .then(({ data }) => {
      item.value = data;
      if (data.pictures.length >= 0) slide.value = data.pictures[0].id;
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
});
</script>

<style scoped lang="scss">
.spec {
  font-size: 1.25em;
  margin: 3px 0;
}
.spotlight {
  .price {
    font-weight: 500;
    font-size: 1.5em;
  }
  padding: 10px;

  height: 120px;
  width: 100%;
  border-radius: 20px;
  background-color: rgb(20, 34, 51);
  color: white;
}
:deep(.q-carousel__slide) {
  background-size: contain;
  background-repeat: no-repeat;
}
.info {
  background-color: rgba(20, 34, 51, 0.5);
}
</style>