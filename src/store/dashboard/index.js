// src/store/modules/dashboard.js

import { AXIOS } from "@/api/index.js"
//import router from "@/router";

const state = {
    playerListDeck: [],
    userGameStats: null,
    userCardCollections: [],
};

const getters = {
    getPlayerListDeck: state => state.playerListDeck,
    getUserGameStats: state => state.userGameStats,
    getUserCardCollections: state => state.userCardCollections,
};

const actions = {
    fetchUserCardCollections({ commit }) {
        return new Promise((resolve, reject) => {
            AXIOS.get('api/players/getAllCards')
                .then(response => {
                    commit('setUserCardCollections', response.data);
                    resolve("done")
                })
                .catch(error => {
                    console.error('Error fetching user card collections:', error);
                    reject("failed")
                });
        });
    },
    fetchUserDeckList({ commit }) {
        return new Promise((resolve, reject) => {
            const player_id = localStorage.getItem("player_id");
            AXIOS.get('api/players/getAllDecks/' + player_id)
                .then(response => {
                    commit('setPlayerListDeck', response.data);
                    resolve("done")
                })
                .catch(error => {
                    console.error('Error fetching user deck collections:', error);
                    reject("failed")
                });
        });
    }
};

const mutations = {
    setPlayerListDeck(state, playerListDeck) {
        state.playerListDeck = playerListDeck;
    },

    setUserGameStats(state, userGameStats) {
        state.userGameStats = userGameStats;
    },

    setUserCardCollections(state, userCardCollections) {
        state.userCardCollections = userCardCollections;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
