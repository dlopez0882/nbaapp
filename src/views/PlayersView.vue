<template>
  <label for="per-page-option">Records per page: </label>
  <select
    name="per-page-option"
    id="perpageoption"
    @change="onChange($event)"
    v-model="per_page"
  >
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="75">75</option>
    <option value="100">100</option>
  </select>

  <label for="search">Player name: </label>
  <input type="text" name="search" @blur="onBlur($event)" />
  <PlayersListComponent
    :key="reload"
    :page="page"
    :per_page="per_page"
    :search="search"
  />
</template>

<script>
import PlayersListComponent from "@/components/PlayersListComponent.vue";

export default {
  name: "PlayersView",
  components: { PlayersListComponent },

  data() {
    return {
      page: "0",
      per_page: "25",
      search: "",
      reload: 0,
    };
  },

  methods: {
    onChange(event) {
      this.per_page = event.target.value;
      this.reload++;
    },

    onBlur(event) {
      this.search = event.target.value;
      this.reload++;
    },
  },
};
</script>
