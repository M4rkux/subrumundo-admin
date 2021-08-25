<template>
  <div class="app-sidebar">
    <div class="app-sidebar__wrapper">
      <ul class="app-sidebar__list">
        <li class="app-sidebar__item">
          <router-link to="/" class="app-sidebar__link">
            <font-awesome-icon icon="chart-bar" class="app-sidebar__icon" />
            <span class="app-sidebar__link-text">Dashboard</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <router-link to="/episodes" class="app-sidebar__link">
            <font-awesome-icon
              icon="microphone-alt"
              class="app-sidebar__icon"
            />
            <span class="app-sidebar__link-text">Episodes</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <router-link to="/subscribers" class="app-sidebar__link">
            <font-awesome-icon icon="rss" class="app-sidebar__icon" />
            <span class="app-sidebar__link-text">Subscribers</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <router-link to="/users" class="app-sidebar__link">
            <font-awesome-icon icon="users" class="app-sidebar__icon" />
            <span class="app-sidebar__link-text">Users</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <a href="#" @click="doLogout" class="app-sidebar__link">
            <font-awesome-icon icon="sign-out-alt" class="app-sidebar__icon" />
            <span class="app-sidebar__link-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarComponent",

  methods: {
    async doLogout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
});
</script>

<style lang="scss" scoped>
.app-sidebar {
  @apply bg-gray-800 shadow-xl h-16 fixed bottom-0 z-10 w-full;

  @screen md {
    @apply w-48 h-screen relative;
  }

  &__wrapper {
    @apply relative content-center text-left justify-between;

    @screen md {
      @apply mt-6 fixed left-0 top-0 content-start;
    }
  }

  &__list {
    @apply flex flex-row py-[10px] px-1 text-center w-full;

    @screen md {
      @apply px-2 flex-col text-left py-3;
    }
  }

  &__item {
    @apply flex-1;
  }

  &__icon {
    @apply m-auto pr-0;

    @screen sm {
      @apply mr-4 w-[20px];
    }
  }

  &__link {
    @apply block py-1 pl-1 align-middle text-gray-400 no-underline border-b-2 border-transparent;

    &:hover {
      @apply text-blue-400 border-blue-400;
    }

    @screen md {
      @apply py-3;
    }

    &.router-link-active {
      @apply text-blue-300 border-blue-300;
    }
  }

  &__link-text {
    @apply pb-1 text-xs block;

    @screen md {
      @apply pb-0 text-base  inline-block;
    }
  }
}
</style>
