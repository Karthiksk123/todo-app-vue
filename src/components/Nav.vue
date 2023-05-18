<script>
export default {
  props: {
    newTitle: String,
  },
};
</script>

<template>
  <div>
    <h1 class="title">Todo App {{ newTitle }}</h1>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 40px;
}
</style>
