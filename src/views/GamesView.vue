<template>
    <div class="container mb-3">
        <form id="gamesQueryBuilder" @submit.prevent="queryGames">
            <label>Select team(s)</label>
            <select id="teamsMenu" class="form-select" multiple aria-label="select teams">
                <option value="" selected>-- Select teams --</option>
                <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.full_name }}</option>
            </select>

            <button type="submit">Show games!</button>
        </form>
    </div>
    <GamesInfoComponent></GamesInfoComponent>
</template>

<script>
    import axios from "axios";
    import GamesInfoComponent from "../components/GamesInfoComponent.vue";

    export default {
        name: "GamesView",

        components: {
            GamesInfoComponent,
        },

        data() {
            return {
                teams: {},
            };
        },

        mounted() {
            const headers = {
                'X-RapidAPI-Key': '959819e95cmshecf23a99cc98e23p15b9d9jsn5e3fd589ab8a',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
            };

            axios.get("https://free-nba.p.rapidapi.com/teams", { headers })
                .then(response => {
                    // console.log(response.data.data);
                    this.teams = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },

        methods: {
            queryGames() {
                //
            },
        }
    };
</script>