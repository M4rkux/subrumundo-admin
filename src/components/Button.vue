<template>
  <button
    class="app-button"
    :class="{ loading }"
    :type="type"
    :id="id"
    :name="name"
    :disabled="loading"
    :title="title"
  >
    {{ label }}
    <font-awesome-icon v-if="!loading" :icon="icon" />
    <font-awesome-icon v-if="loading" icon="circle-notch" spin />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ButtonComponent",

  data() {
    return {
      value: this.valueProp,
    };
  },

  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "button",
    },
    id: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.app-button {
  @apply bg-blue-500 text-white font-bold py-2 px-4 h-[42px] rounded;
  @apply flex justify-center items-center;

  &:hover {
    @apply bg-blue-900;
  }

  &.loading {
    @apply bg-gray-500 cursor-default;
  }
}
</style>
