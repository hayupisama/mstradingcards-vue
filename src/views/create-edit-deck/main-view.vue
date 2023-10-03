<template>
    <div>
        <!-- Basic Deck Info Section -->
        <div class="section">
            <h2>Basic Deck Info</h2>
            <label for="deckName">Deck Name:</label>
            <input type="text" v-model="deckName"><br>
            <label for="numOfCards">Number of Cards:</label>
            <input type="number" v-model="numOfCards">
        </div>

        <!-- Filter Card Section -->
        <div class="section">
            <h2>Filter Card</h2>
            <label for="rarity">Rarity:</label>
            <select v-model="selectedRarity">
                <option value="">All</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
            </select><br>
            <!-- Add more filter fields as needed -->
        </div>


        <!-- Deck Composition Section -->
                <div class="section card-collection">
                    <h2>Deck Composition</h2>
                    <div v-if="deckCompo.length === 0">Deck empty, Choose a card to add</div>
                    <article v-else v-for="card in deckCompo" :key="card.id" :style="{ backgroundColor: getRarityColor(card.rarity) }"
                        class="card">
                        <img :src="card.image" :alt="card.name">
                        <h3>{{ card.name }}</h3>
                        <p>Description: {{ card.description }}</p>
                        <p>Attack Points: {{ card.attackPoints }}</p>
                        <p>Health Points: {{ card.healthPoints }}</p>
                    </article>
                </div>

                
        <!-- Card Collection Section -->
        <div class="section card-collection">
            <h2>Card Collection</h2>
            <article v-for="card in filteredCards" :key="card.id" :style="{ backgroundColor: getRarityColor(card.rarity) }"
                class="card">
                <img :src="card.image" :alt="card.name">
                <h3>{{ card.name }}</h3>
                <p>Description: {{ card.description }}</p>
                <p>Attack Points: {{ card.attackPoints }}</p>
                <p>Health Points: {{ card.healthPoints }}</p>
            </article>
        </div>

        
    </div>
</template>

<script>
export default {
    data() {
        return {
            deckName: '',
            numOfCards: 30,
            selectedRarity: '',
            deckCompo:[],
            cards: [
                { id: 1, name: 'Card A', image: 'cardA.jpg', description: 'Description for Card A', rarity: 'Common', attackPoints: 2, healthPoints: 3 },
                { id: 2, name: 'Card B', image: 'cardB.jpg', description: 'Description for Card B', rarity: 'Rare', attackPoints: 4, healthPoints: 2 },
                { id: 3, name: 'Card C', image: 'cardC.jpg', description: 'Description for Card C', rarity: 'Epic', attackPoints: 5, healthPoints: 5 },
                { id: 3, name: 'Card C', image: 'cardC.jpg', description: 'Description for Card C', rarity: 'Legendary', attackPoints: 5, healthPoints: 5 },
                // Add more cards as needed
            ]
        };
    },
    computed: {
        filteredCards() {
            return this.cards.filter(card => {
                if (!this.selectedRarity || card.rarity === this.selectedRarity) {
                    return true;
                }
                return false;
            });
        }
    },
    methods: {
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
        }
    }
};
</script>

<style scoped>
.section {
    margin-bottom: 20px;
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
</style>
