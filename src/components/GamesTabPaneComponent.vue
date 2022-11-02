<template>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li v-for="tab in tabs" class="nav-item" role="presentation">
            <button v-if="tab.displayButton" :class="tab.buttonClass" :id="tab.buttonId" data-bs-toggle="tab" :data-bs-target="tab.dataBsTarget" type="button" role="tab" :aria-controls="tab.ariaControls" :aria-selected="tab.ariaSelected">
                <span>{{ tab.buttonLabel }}</span>
            </button>
        </li>
    </ul>

    <div class="tab-content" id="myTabContent">
        <div v-for="pane in panes" :class="pane.tabPaneClass" :id="pane.tabPaneId" role="tabpanel" :aria-labelledby="pane.ariaLabelledby">
            <div :id="pane.groupId" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                <p v-if="pane.displayNoDataMsg">{{ pane.noDataMsg }}</p>
                <div v-else class="col" v-for="dataPoint in pane.data" :key="dataPoint.id">
                    <GameCardComponent :data = "dataPoint"></GameCardComponent>
                </div>
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
            tabs: Array,
            panes: Array,
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