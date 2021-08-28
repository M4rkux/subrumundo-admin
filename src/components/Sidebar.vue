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
            <span class="app-sidebar__link-text">Episódios</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <router-link to="/patrons" class="app-sidebar__link">
            <font-awesome-icon
              icon="hand-holding-usd"
              class="app-sidebar__icon"
            />
            <span class="app-sidebar__link-text">Patrões</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <router-link to="/subscribers" class="app-sidebar__link">
            <font-awesome-icon icon="rss" class="app-sidebar__icon" />
            <span class="app-sidebar__link-text">Inscritos</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <router-link to="/users" class="app-sidebar__link">
            <font-awesome-icon icon="users" class="app-sidebar__icon" />
            <span class="app-sidebar__link-text">Usuários</span>
          </router-link>
        </li>
        <li class="app-sidebar__item">
          <router-link to="/login" class="app-sidebar__link">
            <font-awesome-icon icon="sign-out-alt" class="app-sidebar__icon" />
            <span class="app-sidebar__link-text">Deslogar</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarComponent",
});
</script>

<style lang="scss" scoped>
.app-sidebar {
  @apply bg-gray-800 shadow-xl h-16 fixed bottom-0 z-10 w-full  border-t-[1px] border-gray-700;

  @screen md {
    @apply w-48 min-h-screen h-auto relative border-t-0;
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

    @screen md {
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
