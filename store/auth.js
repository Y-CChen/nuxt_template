import Cookies from 'js-cookie';

const cookieKey = 'auth';

const state = () => {
  let auth = Cookies.getJSON(cookieKey);
  if (typeof auth !== 'object') {
    auth = {};
  }
  return {
    authenticated: auth.authenticated || false,
    username: auth.username || null,
    accessToken: auth.accessToken || null,
    profile: auth.profile || null,
  };
};

const getters = {
  isAuthenticated(state) {
    return state.authenticated;
  },
  username(state) {
    return state.username;
  },
  accessToken(state) {
    return state.access_token;
  },
};

const actions = {
  login({ commit, dispatch }, { username, password }) {
    if (!username && !password) {
      return;
    }
    commit('SET_USERNAME', username);
    commit('SET_ACCESS_TOKEN', 'access_token');
    commit('SET_AUTHENTICATED', true);
    dispatch('fetchProfile');
  },
  logout({ commit }) {
    commit('SET_AUTHENTICATED', false);
    commit('SET_ACCESS_TOKEN', null);
    commit('SET_USERNAME', null);
    commit('SET_PROFILE', null);
  },
  fetchProfile({ commit }) {
    commit('SET_PROFILE', {});
  },
};

const mutations = {
  SET_AUTHENTICATED(state, authenticated) {
    state.authenticated = authenticated;
    Cookies.set(cookieKey, state);
  },
  SET_USERNAME(state, username) {
    state.username = username;
    Cookies.set(cookieKey, state);
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
    Cookies.set(cookieKey, state);
  },
  SET_PROFILE(state, profile) {
    state.profile = profile;
    Cookies.set(cookieKey, state);
  },
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
};
