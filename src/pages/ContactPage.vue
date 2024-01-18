<template>
  <q-page padding class="flex flex-center">
    <q-img src="https://assets.pi55xx.com/gems/assets/diamond-logo-1.png" />
    <q-form @submit.prevent="submit" class="form">
      <div class="text-center text-h6">We will contact you shortly</div>
      <q-input label="Name" required v-model="name" />
      <q-input label="Phone" required v-model="phone" type="tel" />
      <q-input label="Your Message" v-model="message" autogrow />
      <div class="text-right">
        <q-btn icon="send" type="submit" flat />
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
import { ref } from "vue";

const { notify } = useQuasar();

const name = ref("");
const phone = ref("");
const message = ref("");
const number = "+959452538242";

const submit = () => {};
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
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  padding: 10px;
  border: 5px solid $primary;
}
</style>
