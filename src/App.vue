<script setup>
import MyBarVue from './components/MyBar.vue';
import MyCardVue from './components/MyCard.vue';
import items from './attractions.json'
</script>

<template>
  <header>
    <MyBarVue />
  </header>

  <main>
    <h1 style="paddingLeft: 10px">Attractions</h1>
    <div className="grid-container">
      <MyCardVue v-bind="items[0]" />
      <MyCardVue v-bind="items[1]" />
      <MyCardVue v-bind="items[2]" />
      <MyCardVue v-bind="items[3]" />
      <MyCardVue v-bind="items[4]" />
      <MyCardVue v-bind="items[5]" />
    </div>
  </main>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
}
@media (min-width: 576px) {
  .grid-container { grid-template-columns: repeat(1, 1fr); }
}
@media (min-width: 992px) {
  .grid-container { grid-template-columns: repeat(3, 1fr); }
}
</style>