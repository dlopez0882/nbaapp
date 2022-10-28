<template>
    <div class="container">
        <div v-if="displaySpinner && !displayTabs" class="d-block text-center">
            <strong>Loading...</strong>
            <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
        </div>

        <ul v-else-if="!displaySpinner && displayTabs" class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="regular-season-tab" data-bs-toggle="tab" data-bs-target="#regular-season" type="button" role="tab" aria-controls="regular-season" aria-selected="true">Regular Season</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="playoffs-tab" data-bs-toggle="tab" data-bs-target="#playoffs" type="button" role="tab" aria-controls="playoffs" aria-selected="false">Playoffs</button>
            </li>
        </ul>
        
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="regular-season" role="tabpanel" aria-labelledby="regular-season-tab">
                <div class="mt-1" v-if="regularSeasonData.length < 1 && displayTabs">
                    <p>No regular season data available.</p>
                </div>
                <div v-else id="regularSeasonGameInfo" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                    <div class="col" v-for="dataPoint in regularSeasonData" :key="dataPoint.id">
                        <div class="card">
                            <div class="card-header">{{ dataPoint.visitor_team.full_name }} at {{ dataPoint.home_team.full_name }}</div>
                            <div v-if="dataPoint.visitor_team_score == 0 && dataPoint.home_team_score == 0" class="card-body">
                                <p>Date: {{ dataPoint.date }} @ {{ dataPoint.status }}</p>
                            </div>
                            <div v-else class="card-body">
                                <p>Date: {{ dataPoint.date }}</p>
                                <p v-html="highlightWinner(dataPoint.visitor_team.abbreviation, dataPoint.visitor_team_score, dataPoint.home_team.abbreviation, dataPoint.home_team_score, dataPoint.status)"></p>
                                <p><a href="javascript:void(0)" @click="showStatsModal(dataPoint.id, dataPoint.visitor_team.abbreviation, dataPoint.home_team.abbreviation, dataPoint.date)" @keydown.esc="hideStatsModal()">View game stats</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="playoffs" role="tabpanel" aria-labelledby="playoffs-tab">
                <div class="mt-1" v-if="postSeasonData.length < 1 && displayTabs">
                    <p>No playoffs data available.</p>
                </div>
                <div v-else id="postSeasonGameInfo" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                    <div class="col" v-for="dataPoint in postSeasonData" :key="dataPoint.id">
                        <div class="card">
                            <div class="card-header">{{ dataPoint.visitor_team.full_name }} at {{ dataPoint.home_team.full_name }}</div>
                            <div v-if="dataPoint.visitor_team_score == 0 && dataPoint.home_team_score == 0" class="card-body">
                                <p>Date: {{ dataPoint.date }} @ {{ dataPoint.status }}</p>
                            </div>
                            <div v-else class="card-body">
                                <p>Date: {{ dataPoint.date }}</p>
                                <p v-html="highlightWinner(dataPoint.visitor_team.abbreviation, dataPoint.visitor_team_score, dataPoint.home_team.abbreviation, dataPoint.home_team_score, dataPoint.status)"></p>
                                <p><a href="javascript:void(0)" @click="showStatsModal(dataPoint.id, dataPoint.visitor_team.abbreviation, dataPoint.home_team.abbreviation, dataPoint.date)" @keydown.esc="hideStatsModal()">View game stats</a></p>
                            </div>
                        </div>
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
    </div>
</template>

<script>
import axios from 'axios';
import GameStatsComponent from './GameStatsComponent.vue';
import { nameRetroizer, abbreviationRetroizer } from '../modules/retroizer';

    export default {
        name: "GamesInfoComponent",

        components: {
            GameStatsComponent
        },

        data() {
            return {
                regularSeasonData: [],
                postSeasonData: [],
                displaySpinner: false,
                displayTabs: false,
                displayStatsModal: false,
                gameid: "",
                statCardTitle: "",
            };
        },

        props: {
            "team_ids": [Number, String],
            "season": [Number, String],
        },

        mounted() {
            // Leaving here in case a potential solution for sorting API data becomes available in future
            // format seasons params
            // const seasonsParams = this.queryStringBuilder(this.season);

            if(this.team_ids !== "" && this.season !== "") {
                this.displaySpinner = true;

                const headers = {
                    "X-RapidAPI-Key": "959819e95cmshecf23a99cc98e23p15b9d9jsn5e3fd589ab8a",
                    "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
                }                 
                Promise.all([
                    axios.get("https://free-nba.p.rapidapi.com/games?seasons[]=" + this.season + "&team_ids[]=" + this.team_ids + "&postseason=false&per_page=100&page=1", { headers }),
                    axios.get("https://free-nba.p.rapidapi.com/games?seasons[]=" + this.season + "&team_ids[]=" + this.team_ids + "&postseason=true&per_page=100&page=1", { headers })
                ])
                    .then(axios.spread((regular_season_response, postseason_response) => {
                        this.regularSeasonData = this.cardDisplayCleanup(regular_season_response.data.data);
                        this.postSeasonData = this.cardDisplayCleanup(postseason_response.data.data);
                    }))
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.displaySpinner = false;
                        this.displayTabs = true;
                    })
            }
        },

        methods: {
            // highlights the winning team's score
            highlightWinner(visitorTeam, visitorScore, homeTeam, homeScore, gameStatus) {
                return ((gameStatus == 'Final') && visitorScore > homeScore) ? 
                `Score: <strong>` + visitorTeam + ` ` + visitorScore + `</strong> | ` + homeTeam + ` ` + homeScore + ` (` + gameStatus + `)` : 
                `Score: ` + visitorTeam + ` ` + visitorScore + ` | <strong>` + homeTeam + ` ` + homeScore + `</strong> (` + gameStatus + `)`;
            },

            /* 
            * for each item, format date to YYYY-MM-DD and retroize team(s) as needed
            * return array of cards by ascending date order
            */
            cardDisplayCleanup(array) {
                array.forEach((item) => {
                    item.date = this.dateFormatter(item.date);
                    item.home_team.full_name = nameRetroizer(this.season, item.home_team.full_name);
                    item.home_team.abbreviation = abbreviationRetroizer(this.season, item.home_team.abbreviation);
                    item.visitor_team.full_name = nameRetroizer(this.season, item.visitor_team.full_name);
                    item.visitor_team.abbreviation = abbreviationRetroizer(this.season, item.visitor_team.abbreviation);
                });

                return array.slice()
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
            },

            dateFormatter(timestamp) {
                return timestamp.slice(0, -14);
            },

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

            // Leaving here in case a potential solution for sorting API data becomes available in future
            // format params that need to be passed as an array into API 
            // queryStringBuilder(data) {
            //     let queryString = "";
            //     for(let i = 0; i < data.length; i++) {
            //         queryString += "seasons[]=" + data[i] + "&";
            //     }

            //     // remove last "&" symbol
            //     queryString = queryString.slice(0, -1);

            //     return queryString;
            // },
        }
    };
</script>