<template>
    <div class="create-deck-container">
        <div class="form-section">
            <h2>Create Deck</h2>
            <div class="form-group">
                <label for="deckName">Deck Name</label>
                <input type="text" id="deckName" v-model="deckName" required />
                <label for="deckSize">Size : {{ deckComposition.length }}</label>
            </div>
            <div class="form-group">
                <label for="filter">Filter Cards by Type</label>
                <select id="filter" v-model="filterType">
                    <option value="all">All Types</option>
                </select>
            </div>
            <button class="btn btn-success">Save</button>
            <button class="btn btn-danger" @click="backToDashBoard()">Back</button>
        </div>

        <div class="middle-section">
            <div class="current-deck-section">
                <h3>Current Deck Composition</h3>
                <ul class="d-flex">
                    <li v-for="card in deckComposition" :key="card.id">
                        <div class="card" style="width: 12rem;" :style="{ backgroundColor: getRarityColor(card.rarity) }">
                            <img src="" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">{{ card.name }}</h5>
                                <p class="card-text">{{ card.description }}</p>
                                <div class="health-pill">HP: {{ card.attackPoints }}</div>
                                <div class="attack-pill">ATK: {{ card.healthPoints }}</div>
                                <a class="btn btn-danger m-3" @click="removeCard(card)">Remove</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="section card-collection">
                <h2>Card Collection</h2>
                <ul class="d-flex">
                    <li v-for="card in cards" :key="card.id">
                        <div class="card" style="width: 12rem;" :style="{ backgroundColor: getRarityColor(card.rarity) }">
                            <img src="" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">{{ card.name }}</h5>
                                <p class="card-text">{{ card.description }}</p>
                                <div class="health-pill">HP: {{ card.attackPoints }}</div>
                                <div class="attack-pill">ATK: {{ card.healthPoints }}</div>
                                <a class="btn btn-primary m-3" @click="addCard(card)">Add</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            deckName: '',
            filterType: 'all',
            deckComposition: [],
            cards: [
                { id: 1, name: 'Card A', image: 'cardA.jpg', description: 'Description for Card A', rarity: 'Common', attackPoints: 2, healthPoints: 3 },
                { id: 2, name: 'Card B', image: 'cardB.jpg', description: 'Description for Card B', rarity: 'Rare', attackPoints: 4, healthPoints: 2 },
                { id: 3, name: 'Card C', image: 'cardC.jpg', description: 'Description for Card C', rarity: 'Epic', attackPoints: 5, healthPoints: 5 },
                { id: 4, name: 'Card D', image: 'cardD.jpg', description: 'Description for Card D', rarity: 'Legendary', attackPoints: 5, healthPoints: 5 },
                // Add more cards as needed
            ]
        };
    },
    computed: {
        deckSize() {
            return this.deckComposition.length;
        }
    },
    methods: {
        addCard(card) {
            this.deckComposition.push(card);
        },
        removeCard(card) {
            let index = this.deckComposition.findIndex(cardIn => card.id === cardIn.id)
            this.deckComposition.splice(index, 1);
        },
        deckCompositionSize() {
            return this.deckComposition.length;
        },
        getRarityColor(rarity) {
            switch (rarity) {
                case 'Common':
                    return 'gray';
                case 'Rare':
                    return 'blue';
                case 'Epic':
                    return 'purple';
                case 'Legendary':
                    return 'orange';
                default:
                    return 'white';
            }
        },
        saveDeck() {
            console.log("save");
        },
        backToDashBoard() {
            this.$router.push("/mydashboard")
        }
    }
};
</script>

<style scoped>
.create-deck-container {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.card-collection {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 200px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.card img {
    max-width: 100%;
    max-height: 100px;
}

.form-section,
.middle-section {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 10px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}

button {
    margin-left: 10px;
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
</style>