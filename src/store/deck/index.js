
import { AXIOS } from "@/api/index.js"
import router from "@/router";

const state = {
    responseMsg: null
};

const mutations = {
    SET_RESPONSE_MSG(state, responseMsg) {
        state.responseMsg = responseMsg;
    }
};
const getters = {
    getResponseMsg: state => state.responseMsg
};

const actions = {
    createDeck({ commit }, { deckComposition, deckName }) {
        const player_id = localStorage.getItem("player_id");
        const deckDTO = {
            "name": deckName,
            "cards": deckComposition.map(card => `${card.id}_${card.name.toLowerCase().replaceAll(" ", "_")}`)
        }
        console.log(deckDTO, deckName)

        AXIOS.post('/api/players/createDeck/' + player_id, deckDTO)
            .then(() => {
                commit('SET_RESPONSE_MSG', "Deck Added");
                router.push("/mydashboard")
            })
            .catch(error => {
                let message = error.message ? `Error ${error.code}: ${error.message}` : 'An error occurred';
                commit('SET_RESPONSE_MSG', message);
            });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
