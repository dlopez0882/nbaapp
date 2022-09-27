<template>
    <div class="container">
        <table class="table table-sm table-bordered table-striped">
            <thead>
                <tr>
                    <th class="table-text">ID</th>
                    <th class="table-text">First name</th>
                    <th class="table-text">Last name</th>
                    <th class="table-text">Position</th>
                    <th class="table-text">Team</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="player in players" :key="player.id">
                <td class="table-text">{{ player.id }}</td>
                <td class="table-text">{{ player.first_name }}</td>
                <td class="table-text">{{ player.last_name }}</td>
                <td class="table-text">{{ player.position }}</td>
                <td class="table-text">{{ player.team.full_name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "PlayersListComponent",

    props: {
        page: String,
        per_page: String,
        search: String,
    },

    data() {
        return {
            players: {},
        };
    },

    mounted() {
        const headers = {
            "X-RapidAPI-Key": "959819e95cmshecf23a99cc98e23p15b9d9jsn5e3fd589ab8a",
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        };

        axios.get("https://free-nba.p.rapidapi.com/players?" + "page=" + this.page + "&per_page=" + this.per_page + "&search=" + this.search,
                { headers }
            ).then((response) => {
                this.players = response.data.data;
            }).catch((error) => {
                console.log(error);
            });
    },
};
</script>

<style scoped>
.row :nth-child(even){
  background-color: #dcdcdc;
}
.row :nth-child(odd){
  background-color: #aaaaaa;
}
</style>
