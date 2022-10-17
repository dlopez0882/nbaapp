<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <TableComponent
                    :header="[
                        { 'heading': 'Player', 'title': 'Player' },
                        { 'heading': 'Team', 'title': 'Team' },
                        { 'heading': 'Ast', 'title': 'Assists' },
                        { 'heading': 'Blk', 'title': 'Blocks' },
                        { 'heading': 'Dreb', 'title': 'Defensive rebounds' },
                        { 'heading': 'FG3%', 'title': '3pt field goal percentage' },
                        { 'heading': 'FG3A', 'title': '3pt field goal attempts' },
                        { 'heading': 'FG3M', 'title': '3pt field goals made' },
                        { 'heading': 'FG%', 'title': 'Field goal %' },
                        { 'heading': 'FGA', 'title': 'Field goal attempts' },
                        { 'heading': 'FGM', 'title': 'Field goals made' },
                        { 'heading': 'FT%', 'title': 'Free throw %' },
                        { 'heading': 'FTA', 'title': 'Free throw attempts' },
                        { 'heading': 'FTM', 'title': 'Free throws made' },
                        { 'heading': 'Mins', 'title': 'Minutes' },
                        { 'heading': 'OReb', 'title': 'Offensive rebounds' },
                        { 'heading': 'Pf', 'title': 'Personal fouls' },
                        { 'heading': 'Pts', 'title': 'Points' },
                        { 'heading': 'Reb', 'title': 'Rebounds' },
                        { 'heading': 'Stl', 'title': 'Steals' },
                        { 'heading': 'Turnovers', 'title': 'Turnovers' },
                    ]"
                    :body="stats"
                    
                    :bodyFields="[
                        'playerName',
                        'teamAbbreviation',
                        'ast', 
                        'blk', 
                        'dreb', 
                        'fg3_pct', 
                        'fg3a', 
                        'fg3m', 
                        'fg_pct', 
                        'fg3_pct', 
                        'fga', 
                        'fgm', 
                        'ft_pct', 
                        'fta', 
                        'ftm', 
                        'min', 
                        'pf', 
                        'pts', 
                        'reb', 
                        'stl', 
                        'turnover', 
                    ]">
                </TableComponent>

                <!-- <table class="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th class="table-text" title="Player">Player</th>
                            <th class="table-text" title="Team">Team</th>
                            <th class="table-text" title="Assists">Ast</th>
                            <th class="table-text" title="Blocks">Blk</th>
                            <th class="table-text" title="Defensive rebounds">Dreb</th>
                            <th class="table-text" title="3pt field goal percentage">FG3%</th>
                            <th class="table-text" title="3pt field goal attempts">FG3A</th>
                            <th class="table-text" title="3pt field goals made">FG3M</th>
                            <th class="table-text" title="Field goal %">FG%</th>
                            <th class="table-text" title="Field goal attempts">FGA</th>
                            <th class="table-text" title="Field goals made">FGM</th>
                            <th class="table-text" title="Free throw %">FT%</th>
                            <th class="table-text" title="Free throw attempts">FTA</th>
                            <th class="table-text" title="Free throws made">FTM</th>
                            <th class="table-text" title="Minutes">Mins</th>
                            <th class="table-text" title="Offensive rebounds">OReb</th>
                            <th class="table-text" title="Personal fouls">Pf</th>
                            <th class="table-text" title="Points">Pts</th>
                            <th class="table-text" title="Rebounds">Reb</th>
                            <th class="table-text" title="Steals">Stl</th>
                            <th class="table-text" title="Turnovers">Turnovers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stat in stats" :key="stat.id">
                            <td class="table-text">{{ stat.player.first_name }} {{ stat.player.last_name }}</td>
                            <td class="table-text">{{ stat.team.abbreviation }}</td>
                            <td class="table-text">{{ stat.ast }}</td>
                            <td class="table-text">{{ stat.blk }}</td>
                            <td class="table-text">{{ stat.dreb }}</td>
                            <td class="table-text">{{ stat.fg3_pct }}</td>
                            <td class="table-text">{{ stat.fg3a }}</td>
                            <td class="table-text">{{ stat.fg3m }}</td>
                            <td class="table-text">{{ stat.fg_pct }}</td>
                            <td class="table-text">{{ stat.fga }}</td>
                            <td class="table-text">{{ stat.fgm }}</td>
                            <td class="table-text">{{ stat.ft_pct }}</td>
                            <td class="table-text">{{ stat.fta }}</td>
                            <td class="table-text">{{ stat.ftm }}</td>
                            <td class="table-text">{{ stat.min }}</td>
                            <td class="table-text">{{ stat.oreb }}</td>
                            <td class="table-text">{{ stat.pf }}</td>
                            <td class="table-text">{{ stat.pts }}</td>
                            <td class="table-text">{{ stat.reb }}</td>
                            <td class="table-text">{{ stat.stl }}</td>
                            <td class="table-text">{{ stat.turnover }}</td>
                        </tr>
                    </tbody>
                </table> -->
                <div class="text-end">
                    <button type="button" class="btn btn-light me-2" @click="$emit('close')">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { abbreviationRetroizer } from '../modules/retroizer';
import TableComponent from './TableComponent.vue';

export default {
    name: "GameStatsComponent",

    components: {
        TableComponent,
    },

    data() {
        return {
            stats: [],
        }
    },

    props: {
        gameid: Number,
        season: Number,
    },

    mounted() {
        const headers = {
            "X-RapidAPI-Key": "959819e95cmshecf23a99cc98e23p15b9d9jsn5e3fd589ab8a",
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        }

        axios.get("https://free-nba.p.rapidapi.com/stats?game_ids[]=" + this.gameid,{ headers })
            .then(response => {
                this.stats = response.data.data;
                this.stats.forEach((item) => {
                    item.team.abbreviation = abbreviationRetroizer(this.season, item.team.abbreviation);
                    item.teamAbbreviation = item.team.abbreviation;
                    item.playerName = item.player.first_name + " " + item.player.last_name;
                    // convert "team" object to an array
                    // item.team = Object.keys(item.team).map((key) => [(key), item.team[key]]);
                })
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.displaySpinner = false;
                this.displayTabs = true;
            })
    },
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    /* font-family: Helvetica, Arial, sans-serif; */
    overflow-y: auto;
    max-height: 700px;
    width: 90%;
}

.modal-container-confirm {
    width: 40%;
}

.modal-container-form {
    width: 65%;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>