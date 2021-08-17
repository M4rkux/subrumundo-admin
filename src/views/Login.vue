<template>
  <div class="app-login">
    <form>
      <div class="mb-4">
        <InputComponent
          label="Username"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <InputComponent
          label="Password"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="app-login__button-wrapper">
        <button class="app-login__button" type="button">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputComponent from "@/components/Input.vue";

export default defineComponent({
  name: "Login",

  components: {
    InputComponent,
  },
});
</script>

<style lang="scss" scoped>
.app-login {
  @apply shadow-md bg-gray-700 rounded px-8 pt-6 pb-8 mb-4 flex flex-col m-auto mt-4;

  @screen sm {
    @apply w-2/3;
  }

  &__button-wrapper {
    @apply flex items-center justify-between;
  }

  &__button {
    @apply bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded;
  }
}
</style>
