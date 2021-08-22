<template>
  <div v-if="loggedIn" id="nav">
    <router-link to="/">Home</router-link> |
    <a href="#" @click="doLogout">Logout</a>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    async doLogout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
});
</script>

<style lang="scss">
body {
  @apply bg-gray-800 text-gray-300;
}

#app {
  @apply container mx-auto px-4 sm:px-0;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
