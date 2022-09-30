<template>
    <div class="container mb-3">
        <form id="gamesQueryBuilder" @submit.prevent="queryGames">
            <div class="row justify-content-between">
                <div class="form-group col-md-4 mb-3">
                    <label class="float-start" for="teams">Team:</label>
                    <select name="teams" id="teams" class="form-control" aria-label="select team" v-model="selectedTeam">
                        <option value="" selected>-- Select team --</option>
                        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.full_name }}</option>
                    </select>
                </div>

                <div class="form-group col-md-4 mb-3">
                    <label class="float-start" for="seasons">Season:</label>
                    <input type="text" name="seasons" id="seasons" class="form-control" v-model="season">
                </div>
                
                <!-- TODO: fix input ID attr to be unique with ID -->
                <div class="form-check" v-for="seasonOption in seasonOptions" @change="buildSeasonsQueryString()">
                    <input class="form-check-input" type="checkbox" :value="seasonOption" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ seasonOption }}
                    </label>
                </div>

                <button type="submit" class="btn btn-primary">Show games!</button>
            </div>
            
        </form>
    </div>
    <GamesInfoComponent :key="reload" :team_ids="selectedTeam" :season="season"></GamesInfoComponent>
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
                selectedTeam: "",
                seasonOptions: ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
                season: "",
                reload: 0,
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
                this.reload++;
            },

            buildSeasonsQueryString() {
                const checked = document.querySelectorAll('input[type="checkbox"]:checked');
                this.season = Array.from(checked).map(x => x.value);
                /* 
                * TODO: need to figure out make season array that works with API.
                * ex. "seasons[]=2019&seasons[]=2020"
                */
            },
        }
    };
</script>