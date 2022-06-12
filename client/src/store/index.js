import { createStore } from "vuex";

export default createStore({
  state: {
    count: 1,
    userLogged: {
      userId: "",
      token: "",
    },
  },
  getters: {
    userLogged: (state) => state.userLogged,
  },
  mutations: {
    userLogged(state, userId, token) {
      state.userLogged.userId = userId;
      state.userLogged.token = token;
    },
  },
  actions: {},
  modules: {},
});
