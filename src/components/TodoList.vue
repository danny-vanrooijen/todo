<template>
  <div>
    <ul class="rounded overflow-hidden bg-white border border-gray-300">
      <li
        class="self-start flex-grow p-2 text-gray-400 bg-gray-100 border border-transparent"
        v-if="!todoList"
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
            @blur="editItem(index, $event)"
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
          @click="completeItem(index)"
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
          @click="removeItem(todo.id)"
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
    // Get the todo list from Firebase
    // Only query the database when the todo list is not filled yet (may only be needed on dev)
    if (this.todoList.length > 0) {
      return;
    }

    // Listen to changes in the database and update the list accordingly
    this.getDatabase().onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "removed") {
          // When database triggers a removed action, also remove this item from the list
          delete this.todoList[change.doc.id];
        } else if (change.type === "modified") {
          // When database triggers a modified action, update the text in the todo item
          this.todoList[change.doc.id].name = change.doc.data().name;
          this.todoList[change.doc.id].completed = change.doc.data().completed;
        } else if (change.type === "added") {
          // When database triggers an added action, ensure it's added to the todo list
          var item = change.doc.data();
          this.addItem(change.doc.id, item.name, item.completed, item.editing);
        }
      });
    });
  },
  methods: {
    addItem(id, text, completed, editing) {
      this.todoList[id] = {
        id: id,
        name: text,
        completed: completed,
        editing: editing
      };
    },
    removeItem(index) {
      this.getDatabase()
        .doc(index)
        .delete()
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    editItem(index, event) {
      // Always toggle the active input field
      this.toggleItemEdit(index);
      // If the value has not changed, stop execution
      if (this.todoList[index].name === event.target.value) {
        return;
      }
      this.getDatabase()
        .doc(index)
        .update({
          name: event.target.value
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    completeItem(index) {
      this.getDatabase()
        .doc(index)
        .update({
          completed: !this.todoList[index].completed
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    getDatabase() {
      return db.collection("todo-items");
    },
    toggleItemEdit(index) {
      this.todoList[index].editing = !this.todoList[index].editing;
    }
  }
};
</script>

<style lang="less" scoped></style>
