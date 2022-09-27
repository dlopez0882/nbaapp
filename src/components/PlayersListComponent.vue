<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Position</th>
        <th>Team</th>
      </tr>
    </thead>
    <tr v-for="player in players" :key="player.id">
      <td>{{ player.id }}</td>
      <td>{{ player.first_name }}</td>
      <td>{{ player.last_name }}</td>
      <td>{{ player.position }}</td>
      <td>{{ player.team.full_name }}</td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayersListComponent",

  props: {
    page: Number,
    per_page: Number,
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

    axios
      .get(
        "https://free-nba.p.rapidapi.com/players?" +
          "page=" +
          this.page +
          "&per_page=" +
          this.per_page +
          "&search=" +
          this.search,
        { headers }
      )
      .then((response) => {
        this.players = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
