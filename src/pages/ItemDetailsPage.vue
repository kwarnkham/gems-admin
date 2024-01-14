<template>
  <q-page padding v-if="item">
    <q-btn
      label="Edit info"
      no-caps
      @click="
        $router.push({
          name: 'update-item',
        })
      "
    />
    <div>Name : {{ item.name }}</div>
    <div>Description : {{ item.description }}</div>
    <q-separator spaced />
    <q-btn
      label="Edit specification"
      no-caps
      @click="
        $router.push({
          name: item.specification ? 'update-item-spec' : 'add-item-spec',
          params: {
            itemId: item.id,
          },
        })
      "
    />
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
    <q-separator spaced />
    <q-banner class="bg-primary text-white">
      <template v-if="item.active_prices?.length">
        <div>
          MMK
          <span>{{
            item.active_prices[
              item.active_prices.length - 1
            ].mmk.toLocaleString()
          }}</span>
        </div>
        <div>
          USD
          <span>{{
            item.active_prices[
              item.active_prices.length - 1
            ].usd.toLocaleString()
          }}</span>
        </div>
        <div>
          <span>
            {{
              new Date(
                item.active_prices[item.active_prices.length - 1].created_at
              ).toLocaleString("en-GB", { hour12: true })
            }}
          </span>
        </div>
      </template>
      <div v-else>No price set yet</div>
      <template v-slot:action>
        <q-btn
          flat
          color="white"
          label="Remove price"
          no-caps
          v-if="item.active_prices?.length"
          @click="removePrice"
        />
        <q-btn
          flat
          color="white"
          label="Set price"
          no-caps
          @click="showSetPriceDialog"
        />
      </template>
    </q-banner>

    <FileInput v-model="pictures" multiple v-slot="{ pickFiles }">
      <q-btn
        flat
        no-caps
        label="Add more pictures"
        @click="pickFiles"
        color="primary"
      />
    </FileInput>

    <div class="row q-gutter-y-sm q-mt-sm" v-if="item.pictures.length">
      <q-card
        class="q-pa-sm col-12 relative-position"
        v-for="picture in item.pictures"
        :key="picture.id"
      >
        <q-card-section class="relative-position">
          <q-img :src="picture.name" fit="contain" />
          <q-btn
            round
            class="absolute-top-right"
            icon="close"
            color="info"
            @click="deletePicture(picture.id)"
          />
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
import SetItemPriceDialog from "src/components/SetItemPriceDialog.vue";
import FileInput from "src/components/FileInput.vue";
import { watch } from "vue";
import useUtils from "src/composables/utils";

const item = ref(null);
const route = useRoute();
const { notify, dialog } = useQuasar();

const pictures = ref([]);
const { buildForm } = useUtils();

const deletePicture = (id) => {
  dialog({
    title: "Confirm",
    message: "Are you sure?",
    noBackdropDismiss: true,
    cancel: true,
  }).onOk(() => {
    api({
      method: "DELETE",
      url: `pictures/${id}`,
    }).then(() => {
      item.value.pictures.splice(
        item.value.pictures.find((e) => e.id == id),
        1
      );
    });
  });
};

watch(pictures, () => {
  if (pictures.value.length > 0)
    api({
      method: "POST",
      url: `items/${item.value.id}/pictures`,
      data: buildForm({
        pictures: pictures.value,
      }),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        item.value.pictures = data.pictures;
        pictures.value = [];
      })
      .catch((e) => {
        notify({
          message: e.response?.data?.message || e.message,
          type: "negative",
        });
      });
});

const removePrice = () => {
  dialog({
    title: "Confirm",
    message: "Are you sure?",
    noBackdropDismiss: true,
    cancel: true,
  }).onOk(() => {
    const price = item.value.active_prices[item.value.active_prices.length - 1];
    api({
      method: "PUT",
      url: `prices/${price.id}`,
      data: {
        mmk: price.mmk,
        usd: price.usd,
        active: false,
      },
    }).then(() => {
      item.value.active_prices = [];
    });
  });
};

const showSetPriceDialog = () => {
  dialog({
    component: SetItemPriceDialog,
  }).onOk((price) => {
    api({
      method: "POST",
      url: "prices",
      data: { ...price, item_id: item.value.id },
    }).then(({ data }) => {
      item.value.active_prices.push(data);
    });
  });
};

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
