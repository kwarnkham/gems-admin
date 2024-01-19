<template>
  <q-page padding v-if="pagination">
    <q-card
      v-for="contact in pagination.data"
      :key="contact.id"
      :dark="contact.end_at != null"
      @click="
        $router.push({
          name: 'contact-details',
          params: {
            id: contact.id,
          },
        })
      "
    >
      <q-card-section>
        <div class="row justify-between q-mb-sm">
          <div><q-icon name="person" size="sm" />{{ contact.name }}</div>
          <div @click.stop="makeCall(contact.phone)">
            <q-icon name="phone" size="sm" />{{ contact.phone }}
          </div>
        </div>
        <div>
          {{ contact.message }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePagination from "src/composables/pagination";

const { pagination } = usePagination({
  url: "contacts",
  append: true,
  params: { per_page: 20 },
});

const makeCall = (number) => {
  window.location.href = `tel:${number}`;
};
</script>
