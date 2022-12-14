<template>
    <div class="container">
        <div class="row justify-content-between mb-3">
            <div class="col-md-2 text-start">
                <label>Records per page:</label>
                <SelectComponent
                    :name="'per-page-option'"
                    :id="'perpageoption'"
                    :options="[
                        { 'value': 25, 'displayText': '25' },
                        { 'value': 50, 'displayText': '50' },
                        { 'value': 75, 'displayText': '75' },
                        { 'value': 100, 'displayText': '100' },
                    ]"
                    :aria-label="'select number of records to display'"
                    v-model="per_page"
                ></SelectComponent>
            </div>

            <div class="col-md-4 my-auto">
                <input type="text" name="search" class="form-control" @blur="queryByName($event)" placeholder="Player search"
                    @keyup.enter="queryByName($event)" />
            </div>
        </div>
    </div>

    <div class="container">
        <div class="mb-2">
            <TableWrapperComponent :wrapperClass="'table-shadow'">
                <template v-slot:component>
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
                            'teamName',
                        ]"
                    ></TableComponent>
                </template>
            </TableWrapperComponent>
        </div>
    </div>

    <div class="container">
        <div class="row justify-content-between mb-3">
            <div class="col-md-4 text-start">
                <label>Page:
                    <SelectComponent
                        :name="'page'"
                        :id="'page'"
                        :options="pages"
                        :aria-label="'select page'"
                        v-model="page"
                    ></SelectComponent>
                </label>
            </div>
        </div>

        <!-- need to paginate this later... -->
        <!-- <div class="col-md-4">
            <label for="page">Page: </label>
            <select name="page" id="page" class="form-control" @change="queryByPage($event)">
                <option v-for="page in pages" :value="page">{{ page }}</option>
            </select>
        </div> -->
    </div>
</template>

<script>
import axios from "axios";
import TableComponent from "@/components/TableComponent.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import TableWrapperComponent from '@/components/TableWrapperComponent.vue';

export default {
    name: "PlayersView",
    components: { 
        TableComponent,
        SelectComponent,
        TableWrapperComponent,
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

    watch: {
        per_page() {
            this.togglePerPageOption();
        },

        page() {
            this.togglePageOption();
        },
    },

    methods: {
        retrievePlayers() {
            axios.get("https://www.balldontlie.io/api/v1/players?" + "page=" + this.page + "&per_page=" + this.per_page + "&search=" + this.search)
                .then((response) => {
                    this.players = response.data.data;
                    this.players.forEach((item) => {
                        item.teamName = item.team.full_name;
                    });
                    this.pages = response.data.meta.total_pages;
                }).catch((error) => {
                    console.log(error);
                });
        },

        togglePerPageOption() {
            // reset selectors
            this.page = 1;
            document.getElementById('page').value = this.page;

            // retrieve new data
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

        togglePageOption() {
            this.retrievePlayers();
        },

    },
};
</script>