// src/store/modules/register/index.js

import { AXIOS } from "@/api/index.js"
import router from "@/router";
const state = {
    registrationStatus: null
};

const getters = {
    getRegistrationStatus: state => state.registrationStatus
};

const actions = {
    createUser({ commit }, userData) {
        AXIOS.post('api/users/createUser', userData)
            .then(() => {
                commit('SET_RESPONSE_MSG', "Register success, redirection to login in 3s...");
                setInterval(() => { router.push("/login"); }, 3000);
            })
            .catch(error => {
                console.error(error)
                const message = error.message ? `Error ${error.code}: ${error.message}` : 'An error occurred';
                console.error(message);
                commit('SET_RESPONSE_MSG', message);
            });

    },
};

const mutations = {
    SET_RESPONSE_MSG(state, status) {
        state.registrationStatus = status;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
