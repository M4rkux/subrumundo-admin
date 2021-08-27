/* eslint-disable no-async-promise-executor */
import Vuex from "vuex";
import { updateApiHeader } from "@/utils/auth";
import { authenticate } from "@/api";

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user") || "{}"),
    loading: false,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    isLoading(state) {
      return state.loading;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise(async (resolve, reject) => {
        try {
          commit("setLoading", true);
          const loggedUser = await authenticate(username, password);
          if (loggedUser) {
            commit("setToken", loggedUser.token);
            localStorage.setItem("token", loggedUser.token);
            commit("setUser", loggedUser.user);
            localStorage.setItem("user", JSON.stringify(loggedUser.user));
            updateApiHeader();
          }
          commit("setLoading", false);
          resolve(loggedUser?.user);
        } catch (error) {
          commit("setLoading", false);
          reject(error);
        }
      });
    },
    logout({ commit }) {
      commit("removeToken");
      commit("removeUser");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      updateApiHeader();
    },
  },
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    removeToken(state) {
      state.token = "";
    },
    removeUser(state) {
      state.user = {};
    },
  },
});
