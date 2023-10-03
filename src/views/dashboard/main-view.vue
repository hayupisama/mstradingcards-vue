<template>
    <div class="dashboard">
        <!-- Current Deck Section -->
        <div class="section">
            <h2>Current Deck</h2>
            <div v-if="decks.length === 0">No decks available</div>
            <div v-else>
                <div v-for="deck in decks" :key="deck.id" class="deck-card">
                    <div class="deck-info">
                        <h3>{{ deck.name }}</h3>
                        <p>Size: {{ deck.size }}</p>
                    </div>
                    <div class="deck-actions">
                        <button @click="showEditDeckContent(deck)">Show/Edit Deck Content</button>
                        <button @click="deleteDeck(deck)">Delete Deck</button>
                    </div>
                </div>
                <button @click="addDeck">Add Deck</button>
            </div>
        </div>

        <!-- Stat Section -->
        <div class="section">
            <h2>Stat Section</h2>
            <p>Number of Victory: {{ stats.victory }}</p>
            <p>Number of Defeat: {{ stats.defeat }}</p>
            <p>Winrate: {{ calculateWinrate() }}%</p>
            <p>Current Season: {{ stats.currentSeason }}</p>
            <p>Message: Will be available soon</p>
        </div>

        <!-- Fight Section -->
        <div class="section">
            <h2>Fight Section</h2>
            <button disabled>Find an opponent</button>
            <p>Message: Will be available soon</p>
        </div>

         <!-- Card Collections Section -->
            <div class="section">
                <h2>Card Collections Section</h2>
                <button disabled>Buy Packs</button>
                
                    <p>N° Packs to open : -1</p>
                    
                        <button disabled>Open a Pack</button>
                <p>Message: Will be available soon</p>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            decks: [
                { id: 1, name: 'Deck A', size: 30 },
                { id: 2, name: 'Deck B', size: 25 },
                // Add more decks as needed
            ],
            stats: {
                victory: 10,
                defeat: 5,
                currentSeason: 'Spring 2023'
            }
        };
    },
    methods: {
        showEditDeckContent(deck) {
            console.log(`Show/Edit content for deck: ${deck.name}`);
            this.$router.push("/mydeck")
        },
        deleteDeck(deck) {
            // Logic to delete deck
            console.log(`Delete deck: ${deck.name}`);
        },
        addDeck() {
            // Logic to add a new deck
            const newDeck = { id: this.decks.length + 1, name: `New Deck ${this.decks.length + 1}`, size: 0 };
            this.decks.push(newDeck);
        },
        calculateWinrate() {
            const totalGames = this.stats.victory + this.stats.defeat;
            return totalGames === 0 ? 0 : ((this.stats.victory / totalGames) * 100).toFixed(2);
        }
    }
};
</script>

<style scoped>
.dashboard {
    display: flex;
    justify-content: space-around;
    margin: 20px;
}

.section {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 300px;
}

.deck-card {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
}

.deck-info {
    flex: 1;
}

.deck-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>
