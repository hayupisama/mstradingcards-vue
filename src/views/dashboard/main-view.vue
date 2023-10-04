<template>
    <div class="dashboard-container">
        <div class="deck-section w-100 ">
            <h2>My Decks</h2>
            <router-link to="/mydeck">Create a deck</router-link>.
            <div v-if="getPlayerListDeck.length === 0" class="empty-message">
                You have no decks.
            </div>
            <div v-else>
                <div class="card" v-for="deck in getPlayerListDeck" :key="deck.id">
                    <div class="card-body">
                        <h5 class="card-title">{{ deck.deckName }}</h5>
                        <p class="card-text">Deck Size: {{ deck.deckSize }}</p>
                        <button class="btn btn-primary" @click="showEditDeckContent(deck)">Edit</button>
                        <button class="btn btn-danger" @click="deleteDeck(deck)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-collection-section">
            <h2>My Card Collections</h2>
            <ul class="card-list">
                <li v-for="card in displayedCards" :key="card.id" class="card-item"
                    :style="{ 'background-color': getRarityColor(card.rarity) }">
                    <img :src="getImage(card)" alt="Card Image" class="card-image" />
                    <div class="card-details" :style="{ backgroundColor: getRarityColor(card.rarity) }">
                        <h4 class="card-name">{{ card.name }}</h4>
                        <p class="card-description">{{ truncateDescription(card.description) }}</p>
                        <div class="card-stats">
                            <div class="health-pill">HP: {{ card.health }}</div>
                            <div class="attack-pill">ATK: {{ card.attack }}</div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <button @click="nextPage" :disabled="currentPage * pageSize >= getUserCardCollections.length">Next</button>
            </div>
        </div>
    </div>
    <div class="dashboard-container">

        <div class="statistics-section w-75">
            <div class="statistic-box">
                <h3>Statistics</h3>
                <div class="statistic-item">
                    <span>Number of Games:</span> {{ numberOfGames }}
                </div>
                <div class="statistic-item">
                    <span>Winrate:</span> {{ winrate }}%
                </div>
                <div class="statistic-item">
                    <span>Elo Points:</span> {{ eloPoints }}
                </div>
                <div class="statistic-item">
                    <span>Current Division (Season):</span> {{ currentDivision }}
                </div>
            </div>
        </div>
        <div class="battlefields-section ">
            <div class="battlefield-box">
                <h3>Battlefields</h3>
                <button class="btn btn-primary" @click="findOpponentRanked">Find an opponent (Ranked)</button>
                <button class="btn btn-secondary" @click="findOpponentFun">Find an opponent (FunMode)</button>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';
//import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    beforeRouteEnter(to, from, next) {
        store.dispatch("dashboard/fetchUserCardCollections").then(() => {
            store.dispatch("dashboard/fetchUserDeckList").then(() => {
                next();
            })
        })
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 4,
            numberOfGames: 100,
            winrate: 65,
            eloPoints: 1500,
            currentDivision: 'Gold',
        };
    },
    methods: {
        showEditDeckContent(deck) {
            console.log(`Show/Edit content for deck: ${deck.name}`);
            this.$router.push("/mydeck")
        },
        deleteDeck(deck) {
            console.log(`Delete deck: ${deck.name}`);
        },
        addDeck() {

        },
        calculateWinrate() {
            const totalGames = this.stats.victory + this.stats.defeat;
            return totalGames === 0 ? 0 : ((this.stats.victory / totalGames) * 100).toFixed(2);
        },
        truncateDescription(description) {
            if (description.length > 100) {
                return description.slice(0, 100) + '...';
            }
            return description;
        },
        nextPage() {
            this.currentPage++;
        },
        prevPage() {
            this.currentPage--;
        },
        getImage(card) {
            console.log(card.name)
            /* const apiKey = 'AIzaSyD3awVk8I8czHjQJZoZcxFVfgRCR3-4Z_w'; // Replace with your actual API key
             const cx = '80ff4cb0c625f4336'; // Replace with your actual custom search engine ID
 
             const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=Harry Potter fandom${card.name}&searchType=image`;
             try {
                 const response = await axios.get(url);
                 const fandomResult = response.data.items.filter((item => item.displayLink.includes("harrypotter.fandom.com")));
                 console.log(fandomResult[0].link)
                 return fandomResult[0].link;
             } catch (error) {
                 return "https://upload.wikimedia.org/wikipedia/fr/f/f3/Hearthstone_%282016%29_Logo.png";
             }*/
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Harry_Potter_Trading_Card_Game_Logo.jpg/1137px-Harry_Potter_Trading_Card_Game_Logo.jpg?20180707150548"
        },
        getRarityColor(rarity) {
            switch (rarity) {
                case 'COMMON':
                    return 'white';
                case 'RARE':
                    return '#348feb';
                case 'EPIC':
                    return '#a200fa';
                case 'LEGENDARY':
                    return '#f24500';
                default:
                    return 'yellow';
            }
        },
    },
    computed: {
        displayedCards() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.getUserCardCollections.slice(start, end);
        },
        ...mapGetters('dashboard', [
            'getUserCardCollections',
            'getPlayerListDeck'
        ])
    }
};
</script>

<style scoped>
.dashboard-container {
    display: flex;
    gap: 2%;
}

.deck-section {
    margin-bottom: 20px;
    min-height: 350px;
}

.card {
    margin-bottom: 10px;
}

.card-collection-section {
    border-left: solid 3px black;
    padding: 15px;
    margin-bottom: 20px;
    min-height: 350px;
}

.card-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 400px;
}

.card-item {
    border: 2px black solid;
    border-radius: 10px;
    padding: 22px;
    margin-bottom: 20px;
    width: 45%;
    max-height: 200px;
}

.card-image {
    border-radius: 50%;
    width: 100%;
    height: 40px;
    object-fit: cover;
}

.card-details {
    margin-left: 10px;
}

.card-name {
    font-size: 1.2em;
    margin-bottom: 5px;
}

.card-description {
    font-size: 0.9em;
    margin-bottom: 5px;
}

.card-stats {
    display: flex;
}

.health-pill,
.attack-pill {
    background-color: #ff6961;
    color: #fff;
    border-radius: 20px;
    padding: 5px 10px;
    margin-right: 10px;
}

.health-pill {
    background-color: green;
}

.statistics-section,
.battlefields-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.statistic-box,
.battlefield-box {
    flex: 1;
    padding: 20px;
    border: 1px solid #ccc;
}

.statistic-item {
    margin-bottom: 10px;
}

.btn {
    margin-top: 10px;
}
</style>