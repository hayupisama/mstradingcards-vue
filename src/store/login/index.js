import { AXIOS, setJwtToken } from "@/api/index.js"
import router from "@/router";


const state = {
  isLoggedIn: false,
  user: null,
  responseMsg: null
};

const mutations = {
  SET_LOGGIN(state) {
    state.isLoggedIn = true;
    state.responseMsg = 'Login successful';
  },
  LOGOUT(state) {
    state.user = null;
    state.isLoggedIn = false;
    state.responseMsg = null;
  },
  SET_RESPONSE_MSG(state, responseMsg) {
    state.responseMsg = responseMsg;
  }
};
const getters = {
  getResponseMsg: state => state.responseMsg
};
const actions = {
  login({ commit }, { username, password }) {
    AXIOS.post('/api/users/login', {
      username,
      password
    })
      .then(response => {
        const jwt = response.data.access_token;
        localStorage.setItem("jwt", jwt);
        setJwtToken(jwt);
        commit('SET_LOGGIN');
        AXIOS.get("api/players/username/" + username).then((response2) => {
          localStorage.setItem("username", username);
          localStorage.setItem("user_id", response2.data.user_id);
          localStorage.setItem("player_id", response2.data.player_id);

          router.push("/mydashboard");
        })
      })
      .catch(error => {
        let message = error.message ? `Error ${error.code}: ${error.message}` : 'An error occurred';
        if (message.includes("403") || message.includes("401"))
          message = "BAD Username or password"
        commit('SET_RESPONSE_MSG', message);
      });
  },

  logout({ commit }) {
    commit('LOGOUT');
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
