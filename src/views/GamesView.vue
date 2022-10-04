<template>
    <div class="container mb-3">
        <fieldset class="form-group border p-3">
            <form id="gamesQueryBuilder" @submit.prevent="queryGames">
                <!-- <div class="row justify-content-between"> -->
                <div class="row">
                    <div class="form-group col-md-4 mb-3">
                        <label for="teams">Team:</label>
                        <select name="teams" id="teams" class="form-control" aria-label="select team" v-model="selectedTeam">
                            <option value="" selected>-- Select team --</option>
                            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.full_name }}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <fieldset class="group reset"> 
                            <legend class="px-2">Select season(s)</legend> 
                            <ul class="checkbox"> 
                                <li class="form-check" v-for="seasonOption in seasonOptions" @change="buildSeasonsArray()">
                                    <input class="form-check-input" type="checkbox" :value="seasonOption" :id="'flexCheckDefault-' + seasonOption">
                                    <label class="form-check-label" :for="'flexCheckDefault-' + seasonOption">
                                        {{ seasonOption }}
                                    </label>
                                </li>
                            </ul>
                        </fieldset>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary float-end">Show games!</button>
                    </div>
                </div>
                
            </form>
        </fieldset>
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
                teams: [], // data returned from /teams API that populates Team selection menu
                selectedTeam: "", // data to be passed to GamesInfoComponent prop "team_ids"
                seasonOptions: ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
                season: [],
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

            buildSeasonsArray() {
                const checked = document.querySelectorAll('input[type="checkbox"]:checked');
                this.season = Array.from(checked).map(x => x.value);
            },
        }
    };
</script>

<style scoped>
.container {
    text-align: left;
}
fieldset.group  { 
  margin: 0; 
  padding: 0; 
  margin-bottom: 1.25em; 
  padding: .125em; 
  border: 1px solid #ced4da;
  border-radius: .375rem;
  /* text-align: left; */
  width: 80%;
} 

fieldset, legend {
   all: revert;
}

.reset {
    all: revert;
}

fieldset.group legend { 
  margin: 0; 
  padding: 0; 
  margin-left: 20px; 
  font-size: 100%; 
  color: #2c3e50; 
} 


ul.checkbox  { 
  margin: 0; 
  padding: 0; 
  margin-left: 20px; 
  list-style: none; 
} 

ul.checkbox li input { 
  margin-right: .25em; 
} 

ul.checkbox li { 
  border: 1px transparent solid; 
  display:inline-block;
  width:12em;
} 

</style>