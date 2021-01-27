<template>
  <div>
    <ul class="rounded overflow-hidden bg-white border border-gray-300">
      <li
        class="self-start flex-grow p-2 text-gray-400 bg-gray-100 border border-transparent"
        v-if="todoList == 0"
      >
        You have not added any things to do
      </li>
      <li
        class="even:bg-gray-100 flex content-center group"
        v-for="(todo, index) in todoList"
        :key="todo"
      >
        <div class="self-start flex-grow p-1 transition duration-400">
          <input
            type="text"
            class="w-full bg-transparent border border-transparent p-1"
            :class="{
              'border border-gray-500': todoList[index].editing,
              'line-through text-gray-300': todoList[index].completed
            }"
            :disabled="!todoList[index].editing"
            :value="todo.name"
            @change="updateTodoItem(index, $event)"
          />
        </div>
        <div
          class="px-2 flex cursor-pointer hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition duration-400"
          v-if="!todoList[index].completed"
          @click="toggleItemEdit(index)"
        >
          <fa
            class="self-center text-black"
            icon="pencil-alt"
            width="16"
            height="16"
          ></fa>
        </div>
        <div
          class="px-2 flex cursor-pointer hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition duration-400"
          @click="toggleItemAsDone(index)"
        >
          <fa
            v-if="!todoList[index].completed"
            class="self-center text-green-900"
            icon="check"
            width="16"
            height="16"
          ></fa>
          <fa
            v-if="todoList[index].completed"
            class="self-center text-yellow-500"
            icon="minus"
            width="16"
            height="16"
          ></fa>
        </div>
        <div
          class="px-2 flex cursor-pointer hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition duration-400"
          @click="removeItem(index)"
        >
          <fa
            class="self-center text-red-900"
            icon="times"
            width="16"
            height="16"
          ></fa>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "@/firestore";

export default {
  props: ["list"],
  data() {
    return {
      todoList: this.list,
      done: []
    };
  },
  mounted() {
    var query = db.collection("todo-items");

    query.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "removed") {
          console.log("Doc is removed");
          return;
        } else {
          var item = change.doc.data();
          this.addItem(item.name, item.completed, item.editing);
        }
      });
    });
  },
  methods: {
    addItem(text, completed, editing) {
      this.todoList.push({
        name: text,
        completed: completed,
        editing: editing
      });
    },
    removeItem(index) {
      this.todoList.splice(index, 1);
    },
    toggleItemAsDone(index) {
      this.todoList[index].completed = !this.todoList[index].completed;
    },
    toggleItemEdit(index) {
      this.todoList[index].editing = !this.todoList[index].editing;
    },
    updateTodoItem(index, event) {
      this.todoList[index].name = event.target.value;
    }
  }
};
</script>

<style lang="less" scoped></style>
