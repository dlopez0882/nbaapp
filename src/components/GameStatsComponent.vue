<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <table class="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th class="table-text">Player</th>
                            <th class="table-text">Team</th>
                            <th class="table-text">Ast</th>
                            <th class="table-text">Blk</th>
                            <th class="table-text">Dreb</th>
                            <th class="table-text">FG3%</th>
                            <th class="table-text">FG3A</th>
                            <th class="table-text">FG3M</th>
                            <th class="table-text">FG%</th>
                            <th class="table-text">FGA</th>
                            <th class="table-text">FGM</th>
                            <th class="table-text">FT%</th>
                            <th class="table-text">FTA%</th>
                            <th class="table-text">FTM%</th>
                            <th class="table-text">Mins</th>
                            <th class="table-text">OReb</th>
                            <th class="table-text">Pf</th>
                            <th class="table-text">PTS</th>
                            <th class="table-text">Reb</th>
                            <th class="table-text">Stl</th>
                            <th class="table-text">Turnover</th>
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
                </table>
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

export default {
    name: "GameStatsComponent",

    data() {
        return {
            stats: [],
        }
    },

    props: {
        gameid: Number,
    },

    mounted() {
        const headers = {
            "X-RapidAPI-Key": "959819e95cmshecf23a99cc98e23p15b9d9jsn5e3fd589ab8a",
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        }

        axios.get("https://free-nba.p.rapidapi.com/stats?game_ids[]=" + this.gameid,{ headers })
            .then(response => {
                this.stats = response.data.data;
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