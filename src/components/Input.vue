<template class="app-input">
  <label
    v-if="label"
    class="app-input__label"
    :class="{ 'app-input__label--icon': icon }"
    :for="id"
    >{{ label }}</label
  >
  <div class="flex flex-row items-center">
    <label :for="id">
      <font-awesome-icon v-if="icon" class="mr-4 text-2xl" :icon="icon" />
    </label>
    <input
      class="app-input__input"
      :class="[
        { 'app-input__input--icon': icon },
        { 'app-input__input--error': showError },
      ]"
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :rules="required"
      @input="updateValue"
      v-model="value"
      @blur="touch"
      @keypress="touch"
    />
  </div>
  <p
    class="app-input__message"
    :class="{ 'app-input__message--icon': icon }"
    v-show="showError"
  >
    Campo obrigatório
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputComponent",
  emits: ["update-value"],

  computed: {
    showError() {
      return this.touched && this.required && !this.value;
    },
  },

  data() {
    return {
      touched: false,
      value: this.valueProp,
    };
  },

  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    id: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    required: {
      type: Boolean,
      required: false,
    },
    valueProp: {
      type: String,
      required: false,
      default: "",
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
  },

  methods: {
    touch() {
      this.touched = true;
    },
    updateValue() {
      this.$emit("update-value", this.value);
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

    &--icon {
      @apply ml-10;
    }
  }

  &__input {
    @apply shadow bg-gray-500 text-gray-300 appearance-none border rounded w-full py-2 px-3;

    &:focus {
      @apply text-gray-200;
    }

    &--icon {
      @apply mr-10;
    }
    &--error {
      @apply border-red-400;
    }
  }

  &__message {
    @apply mt-2 text-left text-red-300 text-xs italic;

    &--icon {
      @apply ml-10;
    }
  }
}
</style>
