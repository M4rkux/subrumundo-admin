<template>
  <div class="app-patrons">
    <h1 class="text-2xl">Patrões</h1>

    <div class="flex flex-col lg:flex-row lg:justify-between">
      <form
        @submit.prevent="createPatron"
        autocomplete="off"
        class="app-patrons__create-wrapper"
      >
        <div class="w-full">
          <InputComponent
            label="Novo patrão"
            id="patronEmail"
            type="email"
            placeholder="patrao@gmail.com"
            :value-prop="patronEmail"
            @updateValue="updatePatronEmail"
          />
        </div>
        <div class="ml-4">
          <ButtonComponent
            type="submit"
            title="Cadastrar"
            :loading="isCreating"
            icon="plus"
          />
        </div>
      </form>

      <form
        @submit.prevent="searchPatron"
        autocomplete="off"
        class="app-patrons__search-wrapper"
      >
        <div class="w-full">
          <InputComponent
            label="Pesquise por e-mail"
            id="patronSearchEmail"
            type="text"
            placeholder="patrao"
            :value-prop="patronSearchEmail"
            @updateValue="updatePatronSearchEmail"
          />
        </div>
        <div class="ml-4">
          <ButtonComponent
            type="submit"
            icon="search"
            title="Pesquisar"
            :loading="isLoading"
          />
        </div>
      </form>
    </div>

    <div class="mt-[30px]">
      <p v-if="searchingFor" class="text-left text-sm">
        Pesquisando por <strong>{{ searchingFor }}</strong>
      </p>
      <div class="app-patrons__content">
        <div class="app-patrons__table-wrapper">
          <table class="app-patrons__table">
            <thead class="app-patrons__table-header">
              <tr>
                <th
                  class="w-3/6 app-patrons__table-clickable"
                  tabindex="0"
                  @click="sortBy('email')"
                  @keypress.enter="sortBy('email')"
                >
                  <div class="flex justify-center items-center">
                    Patrão
                    <font-awesome-icon
                      class="app-patrons__icon-sort"
                      :class="{ hidden: sort !== 'email' }"
                      :icon="isSortAsc ? 'sort-up' : 'sort-down'"
                    />
                  </div>
                </th>
                <th
                  class="w-2/6 app-patrons__table-clickable"
                  tabindex="0"
                  @click="sortBy('createdAt')"
                  @keypress.enter="sortBy('createdAt')"
                >
                  <div class="flex justify-center items-center">
                    Data do cadastro
                    <font-awesome-icon
                      class="app-patrons__icon-sort"
                      :class="{ hidden: sort !== 'createdAt' }"
                      :icon="isSortAsc ? 'sort-up' : 'sort-down'"
                    />
                  </div>
                </th>
                <th class="w-1/6 p-3">Deletar</th>
              </tr>
            </thead>
            <tbody v-if="isLoading">
              <tr>
                <td colspan="3" class="p-8">
                  <font-awesome-icon
                    icon="circle-notch"
                    spin
                    class="text-5xl"
                  />
                </td>
              </tr>
            </tbody>
            <tbody v-if="!isLoading">
              <tr
                class="bg-gray-800"
                v-for="(patron, index) in patrons"
                :key="index"
              >
                <td class="p-3 text-left break-all">
                  {{ patron.email }}
                </td>
                <td class="p-3">
                  {{ $filters.formatDate(patron.createdAt) }}
                </td>
                <td class="p-3">
                  <button
                    type="button"
                    class="app-patrons__action-button"
                    @click="deletePatron(patron.id)"
                  >
                    <font-awesome-icon icon="trash" class="text-base" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputComponent from "@/components/Input.vue";
import ButtonComponent from "@/components/Button.vue";
import { getPatrons, createPatron, deletePatron } from "@/api/patrons";
import { IPatron } from "@/interface/patron";

export default defineComponent({
  name: "Patrons",

  data() {
    return {
      patronEmail: "",
      patronSearchEmail: "",
      searchingFor: "",
      isLoading: false,
      isCreating: false,
      patrons: new Array<IPatron>(),
      sort: "createdAt",
      isSortAsc: false,
      page: 0,
      total: 0,
    };
  },

  components: {
    InputComponent,
    ButtonComponent,
  },

  mounted() {
    this.getPatrons();
  },

  methods: {
    async getPatrons() {
      this.isLoading = true;
      const sort = `${!this.isSortAsc ? "-" : ""}${this.sort}`;
      const { patrons, total } = await getPatrons(
        this.page,
        sort,
        this.patronSearchEmail
      );
      this.isLoading = false;
      this.patrons = patrons || [];
      this.total = total || 0;
    },
    async createPatron() {
      this.isCreating = true;
      await createPatron(this.patronEmail);
      this.isCreating = false;
      this.patronEmail = "";
      this.getPatrons();
    },
    async searchPatron() {
      this.searchingFor = this.patronSearchEmail;
      await this.getPatrons();
    },
    async deletePatron(id: string) {
      await deletePatron(id);
      this.getPatrons();
    },
    sortBy(col: string) {
      if (this.sort === col) {
        this.isSortAsc = !this.isSortAsc;
      } else {
        this.isSortAsc = true;
      }
      this.sort = col;
      this.getPatrons();
    },
    updatePatronEmail(patronEmail: string) {
      this.patronEmail = patronEmail;
    },
    updatePatronSearchEmail(patronSearchEmail: string) {
      this.patronSearchEmail = patronSearchEmail;
    },
  },

  filter: {
    date(value: string) {
      return new Date(value).toDateString();
    },
  },
});
</script>
<style lang="scss" scoped>
.app-patrons {
  &__create-wrapper {
    @apply flex flex-row items-end w-full;

    @screen lg {
      @apply mr-[15px];
    }
  }

  &__search-wrapper {
    @apply mt-[30px] flex flex-row items-end w-full;

    @screen lg {
      @apply ml-[15px];
    }
  }

  &__content {
    @apply flex;
  }

  &__table-wrapper {
    @apply overflow-auto mx-auto w-full;

    @screen lg {
      @apply overflow-visible;
    }
  }

  &__table {
    @apply table w-full text-gray-400 border-separate space-y-6 text-sm rounded-xl;
  }

  &__table-header {
    @apply bg-gray-800 text-gray-500;
  }

  &__table-clickable {
    @apply p-3 text-gray-400 cursor-pointer justify-center;

    &:hover {
      @apply bg-gray-900;
    }
  }

  &__icon-sort {
    @apply ml-[10px];
  }

  &__action-button {
    @apply text-gray-400;

    &:hover {
      @apply text-gray-100;
    }
  }
}
</style>
