<template>
    <div class="container">
        <div v-if="displaySpinner && !displayTabs" class="d-block text-center">
            <strong>Loading...</strong>
            <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
        </div>

        <ul v-else-if="!displaySpinner && displayTabs" class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="regular-season-completed-tab" data-bs-toggle="tab" data-bs-target="#regular-season-completed" type="button" role="tab" aria-controls="regular-season-completed" aria-selected="true">
                    <span v-if="regularSeasonUpcomingData.length > 0">Regular Season - Completed</span>
                    <span v-else>Regular Season</span>
                </button>
            </li>
            <li v-if="regularSeasonUpcomingData.length > 0" class="nav-item" role="presentation">
                <button class="nav-link" id="regular-season-upcoming-tab" data-bs-toggle="tab" data-bs-target="#regular-season-upcoming" type="button" role="tab" aria-controls="regular-season-upcoming" aria-selected="false">Regular Season - Upcoming</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="playoffs-completed-tab" data-bs-toggle="tab" data-bs-target="#playoffs-completed" type="button" role="tab" aria-controls="playoffs-completed" aria-selected="false">
                    <span v-if="postSeasonUpcomingData.length > 0">Playoffs - Completed</span>
                    <span v-else>Playoffs</span>
                </button>
            </li>
            <li v-if="postSeasonUpcomingData.length > 0" class="nav-item" role="presentation">
                <button class="nav-link" id="playoffs-upcoming-tab" data-bs-toggle="tab" data-bs-target="#playoffs-upcoming" type="button" role="tab" aria-controls="playoffs-upcoming" aria-selected="false">Playoffs - Upcoming</button>
            </li>
        </ul>
        
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="regular-season-completed" role="tabpanel" aria-labelledby="regular-season-completed-tab">
                <div class="mt-1" v-if="regularSeasonCompletedData.length < 1 && displayTabs">
                    <p>No regular season data available.</p>
                </div>

                <div v-else id="regularSeasonCompletedGameInfo">
                    <div class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                        <div class="col" v-for="dataPoint in regularSeasonCompletedData" :key="dataPoint.id">
                            <GameCardComponent :data = "dataPoint"></GameCardComponent>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="regular-season-upcoming" role="tabpanel" aria-labelledby="regular-season-upcoming-tab">
                <div class="mt-1" v-if="regularSeasonUpcomingData.length < 1 && displayTabs">
                    <p>No regular season data available.</p>
                </div>

                <div v-else id="regularSeasonUpcomingGameInfo">
                    <div class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                        <div class="col" v-for="dataPoint in regularSeasonUpcomingData" :key="dataPoint.id">
                            <GameCardComponent :data = "dataPoint"></GameCardComponent>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="playoffs-completed" role="tabpanel" aria-labelledby="playoffs-completed-tab">
                <div class="mt-1" v-if="postSeasonCompletedData.length < 1 && displayTabs">
                    <p>No playoffs data available.</p>
                </div>
                <div v-else id="postSeasonCompletedGameInfo" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                    <div class="col" v-for="dataPoint in postSeasonCompletedData" :key="dataPoint.id">
                        <GameCardComponent :data = "dataPoint"></GameCardComponent>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="playoffs-upcoming" role="tabpanel" aria-labelledby="playoffs-upcoming-tab">
                <div class="mt-1" v-if="postSeasonUpcomingData.length < 1 && displayTabs">
                    <p>No playoffs data available.</p>
                </div>
                <div v-else id="postSeasonUpcomingGameInfo" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                    <div class="col" v-for="dataPoint in postSeasonUpcomingData" :key="dataPoint.id">
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
    </div>
</template>

<script>
import axios from 'axios';
import GameStatsComponent from './GameStatsComponent.vue';
import GameCardComponent from '@/components/GameCardComponent.vue';
import { nameRetroizer, abbreviationRetroizer } from '../modules/retroizer';

    export default {
        name: "GamesInfoComponent",

        components: {
            GameStatsComponent,
            GameCardComponent,
        },

        data() {
            return {
                regularSeasonCompletedData: [],
                regularSeasonUpcomingData: [],
                postSeasonCompletedData: [],
                postSeasonUpcomingData: [],
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
                        this.cardDisplayCleanup(regular_season_response.data.data).forEach((item) => {
                            (item.status.toUpperCase() == "FINAL") ? this.regularSeasonCompletedData.push(item) : this.regularSeasonUpcomingData.push(item);
                        });

                        this.cardDisplayCleanup(postseason_response.data.data).forEach((item) => {
                            (item.status.toUpperCase() == "FINAL") ? this.postSeasonCompletedData.push(item) : this.postSeasonUpcomingData.push(item);
                        });
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