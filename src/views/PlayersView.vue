<template>
    <div class="container">
        <div class="row justify-content-between mb-3">
            <div class="col-md-4 text-start">
                <label>Show
                    <InputSelectComponent
                        :name="'per-page-option'"
                        :id="'perpageoption'"
                        :options="[
                            { 'value': 25, 'displayText': '25' },
                            { 'value': 50, 'displayText': '50' },
                            { 'value': 75, 'displayText': '75' },
                            { 'value': 100, 'displayText': '100' },
                        ]"
                        @change="togglePerPageOption($event)"
                        v-model="per_page"
                    ></InputSelectComponent>
                records</label>
            </div>

            <!-- need to paginate this later... -->
            <!-- <div class="col-md-4">
                <label for="page">Page: </label>
                <select name="page" id="page" class="form-control" @change="queryByPage($event)">
                    <option v-for="page in pages" :value="page">{{ page }}</option>
                </select>
            </div> -->

            <div class="col-md-4 text-end">
                <input type="text" name="search" class="form-control" @blur="queryByName($event)" placeholder="Player search"
                    @keyup.enter="queryByName($event)" />
            </div>
        </div>
    </div>

    <TableComponent
        :header="[
            { 'heading': 'First Name', 'title': 'First Name' },
            { 'heading': 'Last Name', 'title': 'Last Name' },
            { 'heading': 'Position', 'title': 'Position' },
            { 'heading': 'Team', 'title': 'Team' },
        ]"
        :body="players"
        :bodyFields="[
            'first_name',
            'last_name',
            'position',
            'teamName'
        ]"
    ></TableComponent>

    <div class="container">
        <div class="row justify-content-between mb-3">
            <div class="col-md-4 text-start">
                <label>Page:
                    <InputSelectComponent
                        :name="'page'"
                        :id="'page'"
                        :options="pages"
                        @change="togglePageOption($event)"
                    ></InputSelectComponent>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import TableComponent from "@/components/TableComponent.vue";
import InputSelectComponent from "@/components/InputSelectComponent.vue";

export default {
    name: "PlayersView",
    components: { 
        TableComponent,
        InputSelectComponent,
    },

    data() {
        return {
            page: "1",
            pages: 1,
            per_page: "25",
            search: "",
            old_search: "",
            players: [],
        };
    },

    mounted() {
        this.retrievePlayers();
    },

    methods: {
        retrievePlayers() {
            const headers = {
                "X-RapidAPI-Key": "959819e95cmshecf23a99cc98e23p15b9d9jsn5e3fd589ab8a",
                "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
            };

            axios.get("https://free-nba.p.rapidapi.com/players?" + "page=" + this.page + "&per_page=" + this.per_page + "&search=" + this.search,
                    { headers }
                ).then((response) => {
                    this.players = response.data.data;
                    this.players.forEach((item) => {
                        item.teamName = item.team.full_name;
                    });
                    this.pages = response.data.meta.total_pages;
                }).catch((error) => {
                    console.log(error);
                });
        },

        togglePerPageOption(event) {
            // reset selectors
            this.page = 1;
            document.getElementById('page').value = this.page;

            // retrieve new data
            this.per_page = event.target.value;
            this.retrievePlayers();
        },

        queryByName(event) {
            this.search = event.target.value;

            // run search if search string differs
            if(this.old_search !== this.search){ 
                // reset selectors
                this.page = 1;
                document.getElementById('page').value = this.page;
                this.per_page = 25;
                document.getElementById('perpageoption').value = this.per_page;

                // retrieve data
                this.retrievePlayers();

                // update current search terms
                this.old_search = this.search;
            }
        },

        togglePageOption(event) {
            this.page = event.target.value;
            this.retrievePlayers();
        },

    },
};
</script>