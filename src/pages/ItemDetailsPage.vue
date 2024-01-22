<template>
  <q-page
    padding
    v-if="item"
    :class="{ 'bg-dark text-white': item.status == 2 }"
  >
    <q-btn
      class="q-mb-xs q-mr-sm"
      label="Edit info"
      no-caps
      @click="
        $router.push({
          name: 'update-item',
        })
      "
    />
    <q-btn
      class="q-mb-xs"
      :icon="item.status == 1 ? 'visibility_off' : 'visibility'"
      no-caps
      @click="toggleStatus"
    />
    <div>Name : {{ item.name }}</div>
    <div>Description : {{ item.description }}</div>
    <q-separator spaced />
    <q-btn
      class="q-mb-xs"
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
    <template v-for="key in Object.keys(item.specification)" :key="key">
      <div
        v-if="
          item.specification[key] &&
          !['id', 'created_at', 'updated_at', 'item_id'].includes(key)
        "
        class="capitalize"
      >
        {{ key.split("_").join(" ") }} : {{ item.specification[key] }}
      </div>
    </template>
    <q-separator spaced />
    <div v-if="item.categories.length" class="q-gutter-x-sm q-mb-sm">
      <q-badge
        v-for="category in item.categories"
        :key="category.id"
        @click="removeCategory(category)"
      >
        {{ category.name }}
      </q-badge>
    </div>
    <div v-else class="text-overline">No Category Added</div>
    <SelectInput
      v-model="selectedCategories"
      multiple
      resource="categories"
      label="Select Categories"
    />
    <div class="text-right q-mt-sm">
      <q-btn
        label="Sync Categories"
        no-caps
        color="primary"
        @click="syncCategories"
      />
    </div>
    <q-separator spaced />
    <q-banner class="bg-primary text-white">
      <template v-if="item.active_prices?.length">
        <div v-if="item.active_prices[item.active_prices.length - 1].mmk">
          MMK
          <span>{{
            item.active_prices[
              item.active_prices.length - 1
            ].mmk.toLocaleString()
          }}</span>
        </div>
        <div v-else-if="appStore.getAppSetting">
          MMK
          <span
            >{{
              (
                item.active_prices[item.active_prices.length - 1].usd *
                appStore.getAppSetting.usd_rate
              ).toLocaleString()
            }}
            (1 USD =
            {{ appStore.getAppSetting.usd_rate.toLocaleString() }} MMK)</span
          >
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
          <q-btn
            round
            class="absolute-top-left"
            :label="picture.sort"
            color="secondary"
            @click="updateSort(picture)"
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
import SelectInput from "src/components/SelectInput.vue";
import { useAppStore } from "src/stores/app-store";

const item = ref(null);
const route = useRoute();
const { notify, dialog } = useQuasar();
const selectedCategories = ref([]);
const { trimObject } = useUtils();

const pictures = ref([]);
const { buildForm } = useUtils();

const appStore = useAppStore();

const updateSort = (picture) => {
  dialog({
    title: "Update sorting",
    prompt: {
      model: picture.sort,
      type: "number",
      mode: "numeric",
      pattern: "[0-9]*",
      isValid: (val) => val > 0 && val != "" && !!val,
    },
  }).onOk((sort) => {
    api({
      method: "PUT",
      url: `pictures/${picture.id}`,
      data: {
        sort,
      },
    })
      .then(({ data }) => {
        item.value.pictures.splice(
          item.value.pictures.findIndex((e) => e.id == data.id),
          1,
          data
        );
        item.value.pictures = item.value.pictures.sort((a, b) => {
          return b.sort - a.sort;
        });
      })
      .catch((e) => {
        notify({
          message: e.response?.data?.message || e.message,
          type: "negative",
        });
      });
  });
};
const syncCategories = () => {
  api({
    url: `items/${item.value.id}/categories/sync`,
    method: "POST",
    data: {
      category_ids: selectedCategories.value.map((e) => e.id),
    },
  }).then(({ data }) => {
    item.value = data;
  });
};

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

const toggleStatus = () => {
  api({
    method: "POST",
    url: `items/${item.value.id}/toggle-status`,
  }).then(({ data }) => {
    item.value.status = data.status;
  });
};

const removeCategory = (category) => {
  dialog({
    title: "Confirmation",
    message: `Remove the category, ${category.name}?`,
    noBackdropDismiss: true,
    cancel: true,
  }).onOk(() => {
    selectedCategories.value.splice(
      selectedCategories.value.findIndex((e) => e.id == category.id),
      1
    );
    syncCategories();
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
      data: trimObject({
        mmk: price.mmk,
        usd: price.usd,
        active: false,
      }),
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
      data: { ...trimObject(price), item_id: item.value.id },
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
      selectedCategories.value = item.value.categories;
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
});
</script>
