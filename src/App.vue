<template>
  <div class="container h-3/4 py-5 md:py-10">
    <h1
      class="font-header text-5xl md:leading-normal md:font-extrabold text-center mb-10"
    >
      My to do list
    </h1>
    <add-item :list="todoList"></add-item>
    <todo-list :list="todoList"></todo-list>
  </div>
</template>

<script>
import AddItem from "./components/AddItem.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    AddItem,
    TodoList
  },
  data() {
    return {
      todoList: ["Create a Vue project"],
      item: "This is a test item"
    };
  }
};
</script>

<style lang="less"></style>
