<template>
  <Sidebar v-if="loggedIn" />
  <div class="w-full">
    <router-view class="container mx-auto pt-5 pb-24 md:pb-5" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  name: "App",

  components: {
    Sidebar,
  },

  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
});
</script>

<style lang="scss">
body {
  @apply bg-gray-700 text-gray-300;
}

#app {
  @apply mx-auto flex flex-col md:flex-row;

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
