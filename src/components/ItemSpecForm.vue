<template>
  <q-form @submit.prevent="submit" class="q-gutter-y-sm" v-if="item">
    <div class="text-center text-h5">{{ title }}</div>
    <div>{{ item.name }}</div>
    <div>{{ item.description }}</div>
    <q-input outlined label="Carat" v-model="carat" required />
    <q-input outlined label="Cut" v-model="cut" />
    <q-input outlined label="Clarity" v-model="clarity" />
    <q-input outlined label="Color" v-model="color" />
    <q-input outlined label="Certification" v-model="certification" />
    <q-input outlined label="Shape" v-model="shape" />
    <q-input outlined label="Origin" v-model="origin" />
    <div class="text-right">
      <q-btn glossy type="submit" label="Submit" no-caps />
    </div>
  </q-form>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: "Add Item Specifications",
  },
  item: {
    type: Object,
    default: null,
  },
  update: {
    type: Boolean,
    default: false,
  },
});

const { notify } = useQuasar();
const carat = ref(props.item.specification?.carat ?? "");
const cut = ref(props.item.specification?.cut ?? "");
const clarity = ref(props.item.specification?.clarity ?? "");
const color = ref(props.item.specification?.color ?? "");
const certification = ref(props.item.specification?.certification ?? "");
const origin = ref(props.item.specification?.origin ?? "");
const shape = ref(props.item.specification?.shape ?? "");
const router = useRouter();

const submit = () => {
  const options = {
    method: "POST",
    url: "specifications",
    data: {
      item_id: props.item.id,
      carat: carat.value,
      cut: cut.value,
      clarity: clarity.value,
      color: color.value,
      certification: certification.value,
      origin: origin.value,
      shape: shape.value,
    },
  };

  if (props.update) {
    options.method = "PUT";
    options.url = `specifications/${props.item.specification.id}`;
  }
  api(options)
    .then(() => {
      if (props.update) router.go(-1);
      else
        router.push({
          name: "add-item-picture",
          params: {
            itemId: props.item.id,
          },
        });
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
};
</script>
