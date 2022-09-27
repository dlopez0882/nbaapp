<template>
    <div class="container">
        <LogoComponent></LogoComponent>
        <div class="row text-start mb-3">
            <div class="col-md-4">
                <label for="search">Player name: </label>
                <input type="text" class="form-control" name="search" @blur="queryByName($event)" placeholder="i.e. Kobe Bryant"
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
                <select name="page" id="page" class="form-control" @change="queryByPage($event)">
                    <option v-for="page in pages" :value="page">{{ page }}</option>
                </select>
            </div>
        </div>
    </div>

    <!-- @pageCount is emitted from child component -->
    <PlayersListComponent @pageCount="setPageCount" :key="reload" :page="page" :per_page="per_page" :search="search"></PlayersListComponent>
</template>

<script>
import PlayersListComponent from "@/components/PlayersListComponent.vue";
import LogoComponent from "@/components/LogoComponent.vue";

export default {
    name: "PlayersView",
    components: { 
        PlayersListComponent, 
        LogoComponent 
    },

    data() {
        return {
            page: "1",
            pages: "",
            per_page: "25",
            search: "",
            old_search: "",
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

            // force re-load if search string differs
            if(this.old_search !== this.search){ 
                this.reload++;
                this.old_search = this.search;
            }
        },

        queryByPage(event) {
            this.page = event.target.value;
            this.reload++;
        },

        // set the number of pages based on emitted data from child component
        setPageCount(page_count) {
            this.pages = page_count;
        }
    },
};
</script>

<style scoped>
/* label {
    text-align:left;
} */
</style>
