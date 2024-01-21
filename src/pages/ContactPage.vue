<template>
  <q-page padding class="flex flex-center">
    <q-img src="~/assets/logo-color.jpeg" class="rounded-borders" />
    <q-form @submit.prevent="submit" class="form">
      <div class="text-center text-h6">We will contact you shortly</div>
      <q-input label="Name" required v-model="name" :disable="disableForm" />
      <q-input
        label="Phone"
        required
        v-model="phone"
        type="tel"
        :disable="disableForm"
      />
      <q-input
        label="Your Message"
        v-model="message"
        autogrow
        :disable="disableForm"
      />
      <div class="text-right">
        <q-btn icon="send" type="submit" flat :disable="disableForm" />
      </div>
    </q-form>
    <q-card class="full-width" dark>
      <q-card-section>
        <div class="text-center">
          {{ number }}
          <q-btn @click="copyNumber" flat icon="file_copy" size="xs" />
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn icon="img:/whatsapp.png" flat />
        <q-btn icon="img:/viber.png" flat />
      </q-card-actions>
    </q-card>
    <div class="text-bold text-subtitle1 row items-center text-grey-4">
      You can also call us now
      <q-btn icon="phone" flat color="green-14" @click="callMe" />
    </div>
  </q-page>
</template>

<script setup>
import { copyToClipboard, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onMounted } from "vue";
import { ref } from "vue";

const { notify, localStorage, dialog } = useQuasar();

let contact = localStorage.getItem("contact");
if (contact && contact.time + 1000 * 60 * 60 <= Date.now()) {
  localStorage.remove("contact");
  contact = null;
}
const name = ref(contact?.name || "");
const phone = ref(contact?.phone || "");
const message = ref(contact?.message || "");
const number = "+959452538242";
const disableForm = ref(false);

const submit = () => {
  api({
    method: "POST",
    url: "contacts",
    data: {
      name: name.value,
      message: message.value,
      phone: phone.value,
    },
  })
    .then(({ data }) => {
      disableForm.value = true;
      data.time = Date.now();
      localStorage.set("contact", data);
      dialog({
        title: "Thank you",
        message: "We will contact you soon",
      });
    })
    .catch((e) => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    });
};

const callMe = () => {
  window.location.href = "tel:" + number;
};

const copyNumber = () => {
  copyToClipboard(number).then(() => {
    notify({
      message: "Copied",
      type: "info",
    });
  });
};

onMounted(() => {
  if (contact) {
    disableForm.value = true;
  }
});
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  padding: 10px;
  border: 5px solid $primary;
  border-radius: 4px;
}
</style>
