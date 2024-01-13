<template>
  <q-page>
    <q-list padding separator bordered>
      <q-item clickable :to="{ name: 'add-item' }" v-ripple>
        <q-item-section>
          <q-item-label> Add Item</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable :to="{ name: 'item-list' }" v-ripple>
        <q-item-section>
          <q-item-label> Item List</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup></script>
