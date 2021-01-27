<template>
  <div class="flex-1 md:flex items-center mb-8">
    <div class="md:w-3/4 mb-4 md:mb-0 md:pr-2">
      <input
        class="border border-gray-300 p-2 w-full rounded"
        type="search"
        v-model="item"
        v-on:keyup.enter="addToList"
      />
    </div>
    <div class="md:w-1/4 md:pl-2">
      <tp-button
        class="w-full text-center"
        color="purple"
        @click="addToList"
        icon="plus-circle"
        type="fas"
        iconLeft
      >
        Add to list
      </tp-button>
    </div>
  </div>
</template>

<script>
import TpButton from "./template/TpButton";
import { db } from "@/firestore";

export default {
  props: ["list"],
  components: {
    TpButton
  },
  data() {
    return {
      item: "",
      todoList: this.list,
      message: {}
    };
  },
  methods: {
    addToList() {
      if (this.item) {
        // this.todoList.push({
        //   name: this.item,
        //   completed: false,
        //   editing: false
        // });
        // this.item = "";

        db.collection("todo-items")
          .add({
            name: this.item,
            completed: false,
            editing: false
          })
          .then(() => {
            alert("Todo item successfully added!");
            this.item = "";
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
