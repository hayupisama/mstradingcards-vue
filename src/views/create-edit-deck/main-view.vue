<template>
    <div class="container mt-5">
        <div v-if="isCardAdded" class="alert alert-success fixed-bottom fade show">
            Card added to the deck
        </div>
        <!-- Top Part -->
        <div class="row top-part fixed-top bg-dark text-light">
            <div class="col-md-6">
                <h2>Create your deck</h2>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="deckName">Deck Name</label>
                    <input type="text" class="form-control" id="deckName" v-model="deckName">
                </div>
                <div class="form-group">
                    <label>Deck Size: {{ deckComposition.length }}</label>
                </div>
                <div class="form-group">
                    <label for="filterDropdown">Filter Cards</label>
                    <select class="form-control" id="filterDropdown" v-model="filterType">
                        <option value="all">All</option>
                        <option value="common">Common</option>
                        <option value="rare">Rare</option>
                        <option value="legendary">Legendary</option>
                    </select>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary m-2"
                        :disabled="deckComposition.length < 20 || deckComposition.length > 30 || deckName.length === 0"
                        @click="saveDeck()">Save</button>
                    <button class="btn btn-secondary m-2" @click="backToDashBoard()">Cancel</button>
                    <button class="btn btn-warning m-2" @click="autoFill()">AutoFill</button>
                </div>
            </div>
        </div>

        <!-- Middle Part - Deck Collection -->
        <div class="row middle-part">
            <div class="col-md-12">
                <h3>Deck Composition</h3>
                <div class="deck-composition d-flex flex-wrap justify-content-start">
                    <div v-for="card in deckComposition" :key="card.id" class="tcg-card mb-4"
                        :class="card.rarity.toLowerCase()" @click="removeFromDeck(card)">
                        <div class="card-body ">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Harry_Potter_Trading_Card_Game_Logo.jpg/1137px-Harry_Potter_Trading_Card_Game_Logo.jpg?20180707150548"
                                alt="Card Image" class="card-image">
                            <h5 class="card-title">{{ card.name }}</h5>
                            <p class="card-text">{{ truncateDescription(card.description) }}</p>
                            <div class="card-stats d-flex flex-column w-50">
                                <div class="health badge bg-success m-1">
                                    <strong>HP:</strong> {{ card.health }}
                                </div>
                                <div class="attack badge bg-danger m-1">
                                    <strong>ATK:</strong> {{ card.attack }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Part - Card Collection -->
        <div class="row mt-4">
            <div class="col-md-12">
                <h3>Card Collection</h3>
                <div class="card-collection d-flex flex-wrap justify-content-center">
                    <div v-for="card in getUserCardCollections" :key="card.id" class="tcg-card mb-4"
                        :class="card.rarity.toLowerCase()" @click="addToDeck(card)">
                        <div class="card-body ">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Harry_Potter_Trading_Card_Game_Logo.jpg/1137px-Harry_Potter_Trading_Card_Game_Logo.jpg?20180707150548"
                                alt="Card Image" class="card-image">
                            <h5 class="card-title">{{ card.name }}</h5>
                            <p class="card-text"><em>{{ truncateDescription(card.description) }}</em></p>
                            <div class="card-stats d-flex flex-column w-50">
                                <div class="health badge bg-success m-1">
                                    <strong>HP:</strong> {{ card.health }}
                                </div>
                                <div class="attack badge bg-danger m-1">
                                    <strong>ATK:</strong> {{ card.attack }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            deckName: '',
            filterType: 'all',
            deckComposition: [],
            isCardAdded: false
        };
    },
    computed: {
        ...mapGetters('dashboard', [
            'getUserCardCollections'
        ])
    },
    methods: {
        addToDeck(card) {
            this.deckComposition.push(card);
            this.isCardAdded = true;
        },
        removeFromDeck(card) {
            let index = this.deckComposition.findIndex(cardIn => card.id === cardIn.id)
            this.deckComposition.splice(index, 1);
        },
        saveDeck() {
            store.dispatch("deck/createDeck", { deckComposition: this.deckComposition, deckName: this.deckName });
        },
        backToDashBoard() {
            this.$router.push("/mydashboard")
        },
        autoFill() {
            this.deckComposition = [];
            const randomCards = this.getRandomCards(30);
            this.deckComposition = [...this.deckComposition, ...randomCards];
        },
        getRandomCards(num) {
            const randomCards = [];
            const listLength = this.getUserCardCollections.length;
            for (let i = 0; i < num; i++) {
                const randomIndex = Math.floor(Math.random() * listLength);
                randomCards.push(this.getUserCardCollections[randomIndex]);
            }
            return randomCards;
        },
        truncateDescription(description) {
            if (description.length > 150) {
                return description.slice(0, 150) + '...';
            }
            return description;
        },
    },
    watch: {
        isCardAdded(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.isCardAdded = false;
                }, 2500);
            }
        }
    }
};
</script>

<style>
/* Add your custom CSS styles here */

.top-part {
    height: 200px;
}

.middle-part {
    margin-top: 205px !important;
}

.tcg-card {
    border-radius: 15px;
    height: 250px;
    width: 150px;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
}

.card-body img {
    height: 50px;
    width: 100%;
}

.card-collection {
    background-color: gray;
}

.card-text {
    font-size: 10px;
}

.deck-composition {
    background-color: lightblue;
}

.common {
    background-color: lightgray;
}

.rare {
    background-color: #348feb;
}

.epic {
    background-color: #a200fa;
}

.legendary {
    background-color: #f24500;
}
</style>