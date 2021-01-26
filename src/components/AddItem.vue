<template>
  <div class="flex-1 md:flex items-center mb-8">
    <div class="md:w-3/4 mb-4 md:mb-0 md:pr-2">
      <input
        class="border border-black p-2 w-full"
        type="text"
        v-model="item"
      />
    </div>
    <div class="md:w-1/4 md:pl-2">
      <tp-button
        class="w-full text-center"
        color="purple"
        v-on:click="addToList"
        icon="plus-circle"
        type="fas"
        iconLeft
        height="22"
        width="22"
      >
        Add to list
      </tp-button>
    </div>
  </div>
</template>

<script>
import TpButton from "./template/TpButton";

export default {
  props: ["list"],
  components: {
    TpButton
  },
  data() {
    return {
      item: "",
      todoList: this.list
    };
  },
  methods: {
    addToList() {
      this.todoList.push(this.item);
    }
  }
};
</script>

<style lang="less" scoped></style>
