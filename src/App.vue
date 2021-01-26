<template>
  <div class="container md:w-3/4 lg:w-1/2 h-3/4 py-5 md:py-10">
    <h1
      class="font-header text-5xl md:leading-normal font-extrabold text-center mb-10"
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
      todoList: [],
      item: "This is a test item"
    };
  }
};
</script>

<style lang="less"></style>
