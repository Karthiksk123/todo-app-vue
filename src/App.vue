<template>
  <div class="app-container">
    <Nav :newTitle="title" />
    <TodoPage @passTitle="changeTitle($event)" />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import TodoPage from "./components/TodoPage.vue";

export default {
  data() {
    return {
      title: "",
    };
  },
  components: {
    Nav,
    TodoPage,
  },
  methods: {
    changeTitle(e) {
      this.title = e;
    },
  },
};
</script>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  padding: 20px 30px;
}
</style>
