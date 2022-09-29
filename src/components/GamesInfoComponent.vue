<template>
    <div class="container">
        <div id="gameInfo" class="card mb-3" v-for="dataPoint in gameData" :key="dataPoint.id">
            <div class="card-body">
                <p>Date: {{ dateFormatter(dataPoint.date) }}</p>
                <p>Matchup: {{ dataPoint.visitor_team.full_name }} at {{ dataPoint.home_team.full_name }}</p>
                <p>Score: {{ dataPoint.visitor_team.abbreviation }} {{ dataPoint.visitor_team_score }} | {{ dataPoint.home_team.abbreviation }} {{ dataPoint.home_team_score }} ({{ dataPoint.status }})</p>
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
                gameData: {},
            };
        },

        props: {
            "team_ids": Array,
            "season": Array,
        },

        mounted() {
            const headers = {
                "X-RapidAPI-Key": "959819e95cmshecf23a99cc98e23p15b9d9jsn5e3fd589ab8a",
                "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
            }
            axios.get("https://free-nba.p.rapidapi.com/games?seasons[]=" + this.season + "&team_ids[]=" + this.team_ids + "&per_page=100",{ headers })
                .then(response => {
                    this.gameData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },

        methods: {
            dateFormatter(timestamp) {
                let d = new Date(timestamp);
                return d.toDateString();
            }
        }
    };
</script>