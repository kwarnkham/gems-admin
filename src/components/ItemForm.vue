<template>
  <q-form @submit.prevent="submit" class="q-gutter-y-sm">
    <div class="text-center text-h5">{{ title }}</div>
    <q-input outlined label="Name" v-model="name" required autofocus />
    <q-input outlined label="Description" v-model="description" required />
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
    default: "Add Item",
  },
  item: {
    type: Object,
    default: () => null,
  },
});

const name = ref(props.item?.name ?? "");
const description = ref(props.item?.description ?? "");
const router = useRouter();
const { notify } = useQuasar();

const submit = () => {
  const options = {
    method: "POST",
    url: "items",
    data: {
      name: name.value,
      description: description.value,
    },
  };
  if (props.item) {
    options.method = "PUT";
    options.url = `items/${props.item.id}`;
  }
  api(options)
    .then(({ data }) => {
      if (options.method == "PUT") router.go(-1);
      else
        router.push({
          name: "add-item-spec",
          params: {
            itemId: data.id,
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
