import Vue from "vue";
import Vuex from "vuex";
import { jwtDecode } from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  getters: {
    decodedToken: (state) => {
      if (!state.token) return null;
      try {
        return jwtDecode(state.token);
      } catch (error) {
        return null;
      }
    },
    isAuthenticated: (state, getters) => {
      const decoded = getters.decodedToken;
      if (!decoded) return false;
      return Date.now() < decoded.exp * 1000;
    },
    getUser: (state) => state.user,
    isAdmin: (state, getters) => {
      const decoded = getters.decodedToken;
      if (!decoded || Date.now() >= decoded.exp * 1000) return false;
      return decoded.admin;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearAuthData(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    login({ commit }, authData) {
      commit("setUser", authData.user);
      commit("setToken", authData.token);
      localStorage.setItem("token", authData.token);
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("token");
    },
  },
  modules: {},
});
