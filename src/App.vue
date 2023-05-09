<script setup>
import Nav from "./components/Nav.vue";
import TodoPage from "./components/TodoPage.vue";
</script>

<template>
  <div class="app-container">
    <Nav />
    <TodoPage />
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  padding: 20px 30px;
}
</style>
