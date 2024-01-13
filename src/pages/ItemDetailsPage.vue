<template>
  <q-page padding v-if="item">
    <div>Name : {{ item.name }}</div>
    <div>Description : {{ item.description }}</div>
    <div v-if="item.specification?.carat">
      Carat : {{ item.specification?.carat }}
    </div>
    <div v-if="item.specification?.cut">
      Cut : {{ item.specification?.cut }}
    </div>
    <div v-if="item.specification?.color">
      Color : {{ item.specification?.color }}
    </div>
    <div v-if="item.specification?.certification">
      Certification : {{ item.specification?.certification }}
    </div>
    <div v-if="item.specification?.shape">
      Shape : {{ item.specification?.shape }}
    </div>
    <div v-if="item.specification?.origin">
      Origin : {{ item.specification?.origin }}
    </div>
    <div class="row q-gutter-y-sm" v-if="item.pictures.length">
      <q-card
        class="q-pa-sm col-12 relative-position"
        v-for="picture in item.pictures"
        :key="picture.id"
      >
        <q-card-section>
          <q-img :src="picture.name" fit="contain" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const item = ref(null);
const route = useRoute();
const { notify } = useQuasar();

onMounted(() => {
  api({
    method: "GET",
    url: `items/${route.params.id}`,
  })
    .then(({ data }) => {
      item.value = data;
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
});
</script>
