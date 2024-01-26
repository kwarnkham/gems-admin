<template>
  <q-page padding v-if="contact" :style-fn="vhPage" class="column bg-grey-4">
    <div class="text-h6 text-center q-gutter-x-sm q-mb-sm">
      <q-btn no-caps flat @click="makeCall">
        <q-icon name="person" />{{ contact.name }} :<q-icon name="phone" />
        {{ contact.phone }}
      </q-btn>
      <q-btn icon="add" round color="primary" push @click="addMeet" />
    </div>
    <div
      class="col overflow-auto q-gutter-y-sm"
      v-if="contact.meets.length > 0"
    >
      <q-card v-for="meet in contact.meets" :key="meet.id">
        <q-card-section>
          {{ meet.note }}
        </q-card-section>
        <q-card-actions align="right">
          <q-banner class="bg-primary rounded-borders text-white">
            {{
              new Date(meet.created_at).toLocaleString("en-GB", {
                hour12: true,
              })
            }}
          </q-banner>
        </q-card-actions>
      </q-card>
    </div>
    <div class="text-center" v-else>You've never met this contact yet</div>
    <q-page-sticky :offset="[18, 18]">
      <q-btn
        label="Pre Orders"
        color="primary"
        style="opacity: 0.5"
        no-caps
        @click="
          $router.push({
            name: 'pre-order-list',
            query: {
              contact_id: contact.id,
            },
          })
        "
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import useApp from "src/composables/app";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const contact = ref(null);
const { notify, dialog } = useQuasar();
const route = useRoute();
const { vhPage } = useApp();

const makeCall = () => {
  window.location.href = `tel:${contact.value.phone}`;
};

const addMeet = () => {
  dialog({
    noBackdropDismiss: true,
    cancel: true,
    prompt: {
      placeholder: "Meeting note",
      model: "",
      isValid: (val) => val && val != "",
      autogrow: true,
    },
  }).onOk((val) => {
    api({
      method: "POST",
      url: "meets",
      data: {
        contact_id: contact.value.id,
        note: val,
      },
    })
      .then(({ data }) => {
        contact.value.meets.unshift(data);
      })
      .catch((e) => {
        notify({
          message: e.response?.data?.message || e.message,
          type: "negative",
        });
      });
  });
};

onMounted(() => {
  api({
    method: "GET",
    url: `contacts/${route.params.id}`,
  })
    .then(({ data }) => {
      contact.value = data;
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
});
</script>
