<template>
    <div class="container">
        <div v-if="displaySpinner" class="d-block text-center">
            <strong>Loading...</strong>
            <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
        </div>
        <div id="gameInfo" class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="dataPoint in sortedGameData" :key="dataPoint.id">
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
</template>

<script>
import axios from 'axios';

    export default {
        name: "GamesInfoComponent",

        data() {
            return {
                gameData: [],
                displaySpinner: false,
            };
        },

        computed: {
            // sort game data by date
            sortedGameData() {
                return this.gameData.slice()
                    .sort((a, b) => new Date(a.date)- new Date(b.date));
            }
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
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.displaySpinner = false;
                    })
            }
        },

        methods: {
            dateFormatter(timestamp) {
                let d = new Date(timestamp);
                return d.toDateString();
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