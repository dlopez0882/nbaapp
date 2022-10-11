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
                <div class="mt-1" v-if="sortedRegularSeasonGameData.length < 1 && displayTabs">
                    <p>No regular season data available.</p>
                </div>
                <div v-else id="regularSeasonGameInfo" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                    <div class="col" v-for="dataPoint in sortedRegularSeasonGameData" :key="dataPoint.id">
                        <div class="card">
                            <div class="card-header">{{ dataPoint.visitor_team.full_name }} at {{ dataPoint.home_team.full_name }}</div>
                            <div class="card-body">
                                <p>Date: {{ dateFormatter(dataPoint.date) }}</p>
                                <p>Score: {{ dataPoint.visitor_team.abbreviation }} {{ dataPoint.visitor_team_score }} | {{ dataPoint.home_team.abbreviation }} {{ dataPoint.home_team_score }} ({{ dataPoint.status }})</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="playoffs" role="tabpanel" aria-labelledby="playoffs-tab">
                <div class="mt-1" v-if="sortedPostSeasonGameData.length < 1 && displayTabs">
                    <p>No playoffs data available.</p>
                </div>
                <div v-else id="postSeasonGameInfo" class="row row-cols-1 row-cols-md-3 g-4 mt-1">
                    <div class="col" v-for="dataPoint in sortedPostSeasonGameData" :key="dataPoint.id">
                        <div class="card">
                            <div class="card-header">{{ dataPoint.visitor_team.full_name }} at {{ dataPoint.home_team.full_name }}</div>
                            <div class="card-body">
                                <p>Date: {{ dateFormatter(dataPoint.date) }}</p>
                                <p>Score: {{ dataPoint.visitor_team.abbreviation }} {{ dataPoint.visitor_team_score }} | {{ dataPoint.home_team.abbreviation }} {{ dataPoint.home_team_score }} ({{ dataPoint.status }})</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: "GamesInfoComponent",

        data() {
            return {
                gameData: [],
                regularSeasonData: [],
                postSeasonData: [],
                displaySpinner: false,
                displayTabs: false,
            };
        },

        computed: {
            // sort regular season data by date
            sortedRegularSeasonGameData() {
                return this.regularSeasonData.slice()
                    .sort((a, b) => new Date(a.date)- new Date(b.date));
            },

            // sort postseason data by date
            sortedPostSeasonGameData() {
                return this.postSeasonData.slice()
                    .sort((a, b) => new Date(a.date)- new Date(b.date));
            },
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
                // TODO: make per_page and page parameters dynamic
                axios.get("https://free-nba.p.rapidapi.com/games?seasons[]=" + this.season + "&team_ids[]=" + this.team_ids + "&per_page=100&page=1",{ headers })
                    .then(response => {
                        this.gameData = response.data.data;
                        this.transformName();

                        // make regular season and post season arrays...
                        this.gameData.forEach((item) => {
                            if(item.postseason === false) {
                                this.regularSeasonData.push(item);
                            } else {
                                this.postSeasonData.push(item);
                            }
                        })
                    })
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
            dateFormatter(timestamp) {
                return timestamp.slice(0, -14);
            },

            transformName() {
                // Seattle SuperSonics
                if(this.season < 2008) {
                    this.gameData.forEach((item) => {
                        item.home_team.full_name = (item.home_team.abbreviation == "OKC") ? "Seattle SuperSonics" : item.home_team.full_name;
                        item.visitor_team.full_name = (item.visitor_team.abbreviation == "OKC") ? "Seattle SuperSonics" : item.visitor_team.full_name;
                        item.home_team.abbreviation = (item.home_team.abbreviation == "OKC") ? "SEA" : item.home_team.abbreviation;
                        item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "OKC") ? "SEA" : item.visitor_team.abbreviation;
                    })
                }

                // San Diego Clippers
                if(this.season < 1984) {
                    this.gameData.forEach((item) => {
                        item.home_team.full_name = (item.home_team.abbreviation == "LAC") ? "San Diego Clippers" : item.home_team.full_name;
                        item.visitor_team.full_name = (item.visitor_team.abbreviation == "LAC") ? "San Diego Clippers" : item.visitor_team.full_name;
                        item.home_team.abbreviation = (item.home_team.abbreviation == "LAC") ? "SDC" : item.home_team.abbreviation;
                        item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "LAC") ? "SDC" : item.visitor_team.abbreviation;
                    })
                }

                // Kansas City Kings
                if(this.season < 1985) {
                    this.gameData.forEach((item) => {
                        item.home_team.full_name = (item.home_team.abbreviation == "SAC") ? "Kansas City Kings" : item.home_team.full_name;
                        item.visitor_team.full_name = (item.visitor_team.abbreviation == "SAC") ? "Kansas City Kings" : item.visitor_team.full_name;
                        item.home_team.abbreviation = (item.home_team.abbreviation == "SAC") ? "KCK" : item.home_team.abbreviation;
                        item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "SAC") ? "KCK" : item.visitor_team.abbreviation;
                    })
                }

                // Vancouver Grizzlies
                if(this.season < 2001) {
                    this.gameData.forEach((item) => {
                        item.home_team.full_name = (item.home_team.abbreviation == "MEM") ? "Vancouver Grizzlies" : item.home_team.full_name;
                        item.visitor_team.full_name = (item.visitor_team.abbreviation == "MEM") ? "Vancouver Grizzlies" : item.visitor_team.full_name;
                        item.home_team.abbreviation = (item.home_team.abbreviation == "MEM") ? "VAN" : item.home_team.abbreviation;
                        item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "MEM") ? "VAN" : item.visitor_team.abbreviation;
                    })
                }

                // New Jersey Nets
                if(this.season < 2012) {
                    this.gameData.forEach((item) => {
                        item.home_team.full_name = (item.home_team.abbreviation == "BKN") ? "New Jersey Nets" : item.home_team.full_name;
                        item.visitor_team.full_name = (item.visitor_team.abbreviation == "BKN") ? "New Jersey Nets" : item.visitor_team.full_name;
                        item.home_team.abbreviation = (item.home_team.abbreviation == "BKN") ? "NJN" : item.home_team.abbreviation;
                        item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "BKN") ? "NJN" : item.visitor_team.abbreviation;
                    })
                }

                // New Orleans Hornets
                if(this.season < 2013) {
                    // New Orleans/Oklahoma City Hornets
                    if(this.season === 2005 || this.season === 2006) {
                        this.gameData.forEach((item) => {
                            item.home_team.full_name = (item.home_team.abbreviation == "NOP") ? "New Orleans/Oklahoma City Hornets" : item.home_team.full_name;
                            item.visitor_team.full_name = (item.visitor_team.abbreviation == "NOP") ? "New Orleans/Oklahoma City Hornets" : item.visitor_team.full_name;
                            item.home_team.abbreviation = (item.home_team.abbreviation == "NOP") ? "NOK" : item.home_team.abbreviation;
                            item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "NOP") ? "NOK" : item.visitor_team.abbreviation;
                        })
                    } else {
                        // New Orleans Hornets
                        this.gameData.forEach((item) => {
                            item.home_team.full_name = (item.home_team.abbreviation == "NOP") ? "New Orleans Hornets" : item.home_team.full_name;
                            item.visitor_team.full_name = (item.visitor_team.abbreviation == "NOP") ? "New Orleans Hornets" : item.visitor_team.full_name;
                            item.home_team.abbreviation = (item.home_team.abbreviation == "NOP") ? "NOH" : item.home_team.abbreviation;
                            item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "NOP") ? "NOH" : item.visitor_team.abbreviation;
                        })
                    }
                }

                // Charlotte Bobcats
                if(this.season > 2004 && this.season < 2014) {
                    this.gameData.forEach((item) => {
                        item.home_team.full_name = (item.home_team.abbreviation == "CHA") ? "Charlotte Bobcats" : item.home_team.full_name;
                        item.visitor_team.full_name = (item.visitor_team.abbreviation == "CHA") ? "Charlotte Bobcats" : item.visitor_team.full_name;
                    })
                }
            }

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