<template>
    <div :class="tabPaneClass" :id="tabPaneId" role="tabpanel" :aria-labelledby="ariaLabelledby">
        <div :id="groupId" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
            <p v-if="displayNoDataMsg">{{ noDataMsg }}</p>
            <div v-else class="col" v-for="dataPoint in data" :key="dataPoint.id">
                <GameCardComponent :data = "dataPoint"></GameCardComponent>
            </div>
        </div>
    </div>
    <transition name="modal">
        <GameStatsComponent v-if="displayStatsModal" @close="hideStatsModal()"
            :gameid = "gameid"
            :season = "this.season"
            :statCardTitle = "statCardTitle">
        </GameStatsComponent>
    </transition>
</template>

<script>
import GameCardComponent from '@/components/GameCardComponent.vue';
import GameStatsComponent from '@/components/GameStatsComponent.vue';

    export default {
        name: "GamesTabPaneComponent",

        components: {
            GameCardComponent,
            GameStatsComponent,
        },

        data() {
            return {
                displayTabs: false,
                displayStatsModal: false,
                gameid: "",
                statCardTitle: "",
            }

        },

        props: {
            tabPaneClass: String,
            tabPaneId: String,
            ariaLabelledby: String,
            groupId: String,
            data: Object,
            displayNoDataMsg: Boolean,
            noDataMsg: String,
            season: [Number, String],
        }, 

        methods: {
            showStatsModal(id, visitorteam, hometeam, date) {
                this.displayStatsModal = true;
                this.gameid = id;
                this.statCardTitle = "Stat Card - " + visitorteam + " vs. " + hometeam + " (" + date + ") "
            },

            hideStatsModal() {
                this.displayStatsModal = false;
                this.gameid = "";
                this.statCardTitle = "";
            },
        }
    }
</script>