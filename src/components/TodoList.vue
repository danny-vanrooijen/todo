<template>
  <div>
    <ul>
      <li v-for="todo in list" :key="todo">
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["list"]
};
</script>

<style lang="less" scoped></style>
