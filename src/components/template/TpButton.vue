<template>
  <button
    class="rounded flex justify-center items-center cursor-pointer p-2 border hover:shadow-lg hover:text-white focus:ring-4 focus:ring-offset-0 focus:shadow-lg"
    :class="{
      [`ring-${color}-800 bg-${color}-800 text-${color}-50 border-${color}-800
      hover:bg-${color}-900 hover:border-${color}-900`]: color && !outline,
      [`ring-${color}-800 border-${color}-800 bg-white text-${color}-800 hover:bg-${color}-800 hover:border-${color}-800 hover:text-white`]: outline
    }"
    v-bind="$attrs"
  >
    <fa
      v-if="iconLeft"
      :icon="icon"
      :type="type"
      :width="width"
      :height="height"
      class="flex-grow-0 mr-2"
    ></fa>
    <slot></slot>
    <fa
      v-if="iconRight"
      :icon="icon"
      :type="type"
      :width="width"
      :height="height"
      class="justify-self-end ml-2"
    ></fa>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: "teal"
    },
    icon: String,
    type: String,
    width: {
      type: Number,
      default: 22
    },
    height: {
      type: Number,
      default: 22
    },
    outline: Boolean,
    iconLeft: Boolean,
    iconRight: Boolean
  }
};
</script>
