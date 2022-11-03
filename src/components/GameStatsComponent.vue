<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h4>{{ statCardTitle }}</h4>
                    <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <TableWrapperComponent :wrapperClass="'table-scrollable'">
                        <template v-slot:component>
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
                                    'fga', 
                                    'fgm', 
                                    'ft_pct', 
                                    'fta', 
                                    'ftm', 
                                    'min',
                                    'oreb', 
                                    'pf', 
                                    'pts', 
                                    'reb', 
                                    'stl', 
                                    'turnover', 
                                ]">
                            </TableComponent>
                        </template>
                    </TableWrapperComponent>
                </div>
                <div class="modal-footer">
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
import TableComponent from '@/components/TableComponent.vue';
import TableWrapperComponent from '@/components/TableWrapperComponent.vue';

export default {
    name: "GameStatsComponent",

    components: {
        TableComponent,
        TableWrapperComponent,
    },

    data() {
        return {
            stats: [],
        }
    },

    props: {
        gameid: Number,
        season: String,
        statCardTitle: String,
    },

    mounted() {
        axios.get("https://www.balldontlie.io/api/v1/stats?game_ids[]=" + this.gameid)
            .then(response => {
                this.stats = response.data.data;
                this.stats.forEach((item) => {
                    item.team.abbreviation = abbreviationRetroizer(this.season, item.team.abbreviation);
                    item.teamAbbreviation = item.team.abbreviation;
                    item.playerName = item.player.first_name + " " + item.player.last_name;
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