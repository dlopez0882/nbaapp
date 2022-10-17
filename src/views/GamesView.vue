<template>
    <div class="container mb-3">
        <fieldset class="form-group border p-3">
            <form id="gamesQueryBuilder" @submit.prevent="queryGames">
                <div class="row row justify-content-around">
                    <div class="form-group col-md-4 mb-3">
                        <label for="teams">Team:</label>
                        <select name="teams" id="teams" class="form-control" aria-label="select team" v-model="selectedTeam" @change="toggleTeamHintText()">
                            <option v-if="displayLoadingOption" value="" selected>-- Loading... --</option>
                            <option v-else value="" selected>-- Select team --</option>
                            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.full_name }}</option>
                        </select>
                        <small v-if="displayTeamHintText">{{ teamHintText }}</small>
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="teams">Season:</label>
                        <select name="seasons" id="seasons" class="form-control" aria-label="select season" v-model="selectedSeason" @change="toggleTeamHintText()">
                            <option value="" selected>-- Select season --</option>
                            <option v-for="season in seasonOptions" :value="season.value">{{ season.displayValue }}</option>
                        </select>
                    </div>
                </div>

                <!-- 
                    Note: Checkbox approach does not work since ordering of data returned from API is not reliable 
                    Leaving here for possible future solution.
                -->
                <!-- <div class="row">
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
                </div> -->

                <div class="row">
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary float-end">Show games!</button>
                    </div>
                </div>
                
            </form>
        </fieldset>
    </div>
    
    <GamesInfoComponent :key="reload" :team_ids="selectedTeam" :season="selectedSeason"></GamesInfoComponent>
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
                seasonOptions: [], // generated year options
                selectedSeason: "", // data to be passed to GamesInfoComponent prop "season"
                reload: 0, // aids in reloading component when submit is clicked
                displayLoadingOption: true,
                displayTeamHintText: false,
                teamHintText: "",
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
                .finally(() => {
                    this.displayLoadingOption = false;
                })

            // generate season options
            // API has data starting from 1979 season
            const currentYear = new Date().getFullYear();
            for(let i = 1979; i < currentYear; i++) {
                let innerObj = {};
                innerObj["displayValue"] = i + "-" + (i + 1);
                innerObj["value"] = i;
                this.seasonOptions.push(innerObj);
            }  
        },

        methods: {
            queryGames() {
                this.reload++;
            },

            // displays a blurb about historical team name based on selected team and season
            toggleTeamHintText() {
                const okc = this.teams.find(team => team.abbreviation == "OKC");
                const lac = this.teams.find(team => team.abbreviation == "LAC");
                const sac = this.teams.find(team => team.abbreviation == "SAC");
                const mem = this.teams.find(team => team.abbreviation == "MEM");
                const bkn = this.teams.find(team => team.abbreviation == "BKN");
                const nop = this.teams.find(team => team.abbreviation == "NOP");
                const cha = this.teams.find(team => team.abbreviation == "CHA");
                const was = this.teams.find(team => team.abbreviation == "WAS");

                if(this.selectedTeam && this.selectedSeason) {
                    if(this.selectedTeam == okc.id && this.selectedSeason < 2008) {
                        this.teamHintText = "Seattle SuperSonics prior to the 2008-2009 season.";
                        this.displayTeamHintText = true;
                    } else if (this.selectedTeam == lac.id && this.selectedSeason < 1984) {
                        this.teamHintText = "San Diego Clippers prior to 1984-1985 season.";
                        this.displayTeamHintText = true;
                    } else if (this.selectedTeam == sac.id && this.selectedSeason < 1985) {
                        this.teamHintText = "Kansas City Kings prior to the 1985-1986 season.";
                        this.displayTeamHintText = true;
                    } else if (this.selectedTeam == mem.id && this.selectedSeason < 2001) {
                        this.teamHintText = "Vancouver Grizzlies prior to the 2001-2002 season.";
                        this.displayTeamHintText = true;
                    } else if (this.selectedTeam == bkn.id && this.selectedSeason < 2012) {
                        this.teamHintText = "New Jersey Nets prior to the 2012-2013 season.";
                        this.displayTeamHintText = true;
                    } else if (this.selectedTeam == nop.id && this.selectedSeason < 2013) {
                        if(this.selectedSeason == 2005 || this.selectedSeason == 2006) {
                            this.teamHintText = "New Orleans/Oklahoma City Hornets for the 2005 and 2006 seasons.";
                        } else {
                            this.teamHintText = "New Orleans Hornets prior to the 2013-2014 season.";
                        }
                        this.displayTeamHintText = true;
                    } else if (this.selectedTeam == cha.id && this.selectedSeason > 2004 && this.selectedSeason < 2014) {
                        this.teamHintText = "Charlotte Bobcats between the 2005-2006 and 2013-2014 seasons.";
                        this.displayTeamHintText = true;
                    } else if (this.selectedTeam == was.id && this.selectedSeason < 1997) {
                        this.teamHintText = "Washington Bullets prior to the 1997-1998 season.";
                        this.displayTeamHintText = true;
                    } else {
                        this.displayTeamHintText = false;
                    }
                }
            },

            // Leaving here in case a potential solution for sorting API data becomes available in future
            // buildSeasonsArray() {
            //     const checked = document.querySelectorAll('input[type="checkbox"]:checked');
            //     this.selectedSeasons = Array.from(checked).map(x => x.value);
            // },
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


/* ul.checkbox  { 
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
}  */

</style>