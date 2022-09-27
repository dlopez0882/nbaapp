<template>
    <div class="container">
        <div class="row mb-3">
            <div class="col-md-4">
                <label for="search">Player name: </label>
                <input type="text" class="form-control" name="search" @blur="queryByName($event)"
                    @keyup.enter="queryByName($event)" />
            </div>

            <div class="col-md-4">
                <label for="per-page-option">Records per page: </label>
                <select name="per-page-option" id="perpageoption" class="form-control" @change="onChange($event)"
                    v-model="per_page">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div class="col-md-4">
                <label for="page">Page: </label>
                <input type="text" class="form-control" name="page" @blur="queryByPage($event)"
                    @keyup.enter="queryByPage($event)" />
            </div>
        </div>
    </div>

    <PlayersListComponent :key="reload" :page="page" :per_page="per_page" :search="search" />
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

        queryByName(event) {
            this.search = event.target.value;
            if (this.search.length > 0) {
                this.reload++;
            }
        },

        queryByPage(event) {
            this.page = event.target.value;
            if (this.page.length > 0) {
                this.reload++;
            }
        },
    },
};
</script>
