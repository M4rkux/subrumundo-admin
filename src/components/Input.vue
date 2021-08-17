<template class="app-input">
  <label class="app-input__label" :for="id">{{ label }}</label>
  <input
    class="app-input__input"
    id="id"
    :name="name"
    :type="type"
    :placeholder="placeholder"
  />
  <p class="app-input__message" v-show="showError">Campo obrigatório</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "InputComponent",

  props: {
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
    },
    showError: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.app-input {
  &__label {
    @apply text-left block text-sm font-bold mb-2 text-gray-300;

    &:focus {
      @apply text-gray-200;
    }
  }

  &__input {
    @apply shadow bg-gray-500 text-gray-300 appearance-none border rounded w-full py-2 px-3;

    &:focus {
      @apply text-gray-200;
    }
  }

  &__message {
    @apply text-red-500 text-xs italic;
  }
}
</style>
