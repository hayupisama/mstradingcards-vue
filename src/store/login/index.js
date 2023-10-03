import axios from 'axios';

const state = {
    isLoggedIn: false,
    user: null,
    responseMsg : null
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
    SET_RESPONSE_MSG(state, responseMsg){
        state.responseMsg = responseMsg;
    }
  };
  const getters = {
    getResponseMsg: state => state.responseMsg
  };
  const actions = {
    login({ commit }, { username, password }) {
        axios.post('http://localhost:80/api/users/login', {
            username,
            password
          })
          .then(response => {
            localStorage.setItem("jwt", response.data.access_token)
            commit('SET_LOGGIN');
          })
          .catch(error => {
            const message = error.response ? `Error ${error.response.status}: ${error.response.data.message}` : 'An error occurred';
            console.error(message);
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
  