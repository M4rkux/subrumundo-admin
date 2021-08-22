<template>
  <button
    class="app-button"
    :class="{ loading }"
    :type="type"
    :id="id"
    :name="name"
    :disabled="loading"
  >
    {{ label }}
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
  @apply bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded;

  &.loading {
    @apply bg-gray-500 cursor-default;
  }
}
</style>
