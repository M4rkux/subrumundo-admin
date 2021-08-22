<template>
  <div class="app-login">
    <form @submit.prevent="doLogin">
      <div class="mb-4">
        <InputComponent
          label="Username"
          id="username"
          type="text"
          placeholder="Username"
          :value-prop="username"
          @updateValue="updateUsername"
          icon="user"
          required
        />
      </div>
      <div class="mb-6">
        <InputComponent
          label="Password"
          id="password"
          type="password"
          placeholder="**********"
          :value-prop="password"
          @updateValue="updatePassword"
          icon="fingerprint"
          required
        />
      </div>
      <div class="app-login__button-wrapper">
        <ButtonComponent type="submit" label="Login" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputComponent from "@/components/Input.vue";
import ButtonComponent from "@/components/Button.vue";

export default defineComponent({
  name: "LoginPage",

  data() {
    return {
      username: "",
      password: "",
    };
  },

  components: {
    InputComponent,
    ButtonComponent,
  },

  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },

  methods: {
    async doLogin() {
      await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      this.$router.push("/");
    },
    updateUsername(username: string) {
      this.username = username;
    },
    updatePassword(password: string) {
      this.password = password;
    },
  },
});
</script>

<style lang="scss" scoped>
.app-login {
  @apply shadow-md bg-gray-700 rounded px-8 pt-6 pb-8 flex flex-col m-auto mt-40;

  @screen sm {
    @apply w-2/3 max-w-lg;
  }

  &__button-wrapper {
    @apply flex items-center justify-center;
  }
}
</style>
