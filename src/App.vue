<script setup>
  import login from './view/login/login.vue'
</script>

<template>
  <header>
  </header>

  <main>
    <h1> Polaris-Core </h1>
    <login></login>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
