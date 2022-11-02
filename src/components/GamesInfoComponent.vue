<template>
    <div class="container">
        <div v-if="displaySpinner && !displayTabs" class="d-block text-center">
            <strong>Loading...</strong>
            <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
        </div>
        
        <GamesTabPaneComponent v-else-if="!displaySpinner && displayTabs"
            :tabs="[
                {
                    'displayButton': true,
                    'buttonClass': 'nav-link active',
                    'buttonId': 'regular-season-completed-tab',
                    'dataBsTarget': '#regular-season-completed',
                    'ariaControls': 'regular-season-completed',
                    'ariaSelected': 'true',
                    'buttonLabel': (regularSeasonUpcomingData.length > 0) ? 'Regular Season - Completed' : 'Regular Season',
                },
                {
                    'displayButton': (regularSeasonUpcomingData.length > 0) ? true : false,
                    'buttonClass': 'nav-link',
                    'buttonId': 'regular-season-upcoming-tab',
                    'dataBsTarget': '#regular-season-upcoming',
                    'ariaControls': 'regular-season-upcoming',
                    'ariaSelected': 'false',
                    'buttonLabel': 'Regular Season - Upcoming',
                },
                {
                    'displayButton': true,
                    'buttonClass': 'nav-link',
                    'buttonId': 'playoffs-completed-tab',
                    'dataBsTarget': '#playoffs-completed',
                    'ariaControls': 'playoffs-completed',
                    'ariaSelected': 'false',
                    'buttonLabel': (postSeasonUpcomingData.length > 0) ? 'Playoffs - Completed' : 'Playoffs',
                },
                {
                    'displayButton': (postSeasonUpcomingData.length > 0) ? true : false,
                    'buttonClass': 'nav-link',
                    'buttonId': 'playoffs-upcoming-tab',
                    'dataBsTarget': '#playoffs-upcoming',
                    'ariaControls': 'playoffs-upcoming',
                    'ariaSelected': 'false',
                    'buttonLabel': 'Playoffs - Upcoming',
                },
            ]"
            :panes="[
                {
                    'tabPaneClass': 'tab-pane fade show active',
                    'tabPaneId': 'regular-season-completed',
                    'ariaLabelledby': 'regular-season-completed-tab',
                    'groupId': 'regular-season-completed-game-info',
                    'data': regularSeasonCompletedData,
                    'displayNoDataMsg': (regularSeasonCompletedData.length < 1 && displayTabs) ? true : false,
                    'noDataMsg': 'No regular season data available.',
                },
                {
                    'tabPaneClass': 'tab-pane fade',
                    'tabPaneId': 'regular-season-upcoming',
                    'ariaLabelledby': 'regular-season-upcoming-tab',
                    'groupId': 'regular-season-upcoming-game-info',
                    'data': regularSeasonUpcomingData,
                    'displayNoDataMsg': (regularSeasonUpcomingData.length < 1 && displayTabs) ? true : false,
                    'noDataMsg': 'No upcoming regular season data available.',
                },
                {
                    'tabPaneClass': 'tab-pane fade',
                    'tabPaneId': 'playoffs-completed',
                    'ariaLabelledby': 'playoffs-completed-tab',
                    'groupId': 'playoffs-completed-game-info',
                    'data': postSeasonCompletedData,
                    'displayNoDataMsg': (postSeasonCompletedData.length < 1 && displayTabs) ? true : false,
                    'noDataMsg': 'No playoff season data available.',
                },
                {
                    'tabPaneClass': 'tab-pane fade',
                    'tabPaneId': 'playoffs-upcoming',
                    'ariaLabelledby': 'playoffs-upcoming-tab',
                    'groupId': 'playoffs-upcoming-game-info',
                    'data': postSeasonUpcomingData,
                    'displayNoDataMsg': (postSeasonUpcomingData.length < 1 && displayTabs) ? true : false,
                    'noDataMsg': 'No upcoming playoff season data available.',
                },
            ]"
            :season = "this.season"
        ></GamesTabPaneComponent>
    </div>
</template>

<script>
import axios from 'axios';
import GamesTabPaneComponent from '@/components/GamesTabPaneComponent.vue';
import { nameRetroizer, abbreviationRetroizer } from '../modules/retroizer';

    export default {
        name: "GamesInfoComponent",

        components: {
            GamesTabPaneComponent,
        },

        data() {
            return {
                regularSeasonCompletedData: [],
                regularSeasonUpcomingData: [],
                postSeasonCompletedData: [],
                postSeasonUpcomingData: [],
                displaySpinner: false,
                displayTabs: false,
            };
        },

        props: {
            "team_ids": [Number, String],
            "season": [Number, String],
        },

        mounted() {
            // Leaving here in case a potential solution for sorting API data becomes available in future
            // format seasons params
            // const seasonsParams = this.queryStringBuilder(this.season);

            if(this.team_ids !== "" && this.season !== "") {
                this.displaySpinner = true;
            
                Promise.all([
                    axios.get("https://www.balldontlie.io/api/v1/games?seasons[]=" + this.season + "&team_ids[]=" + this.team_ids + "&postseason=false&per_page=100&page=1"),
                    axios.get("https://www.balldontlie.io/api/v1/games?seasons[]=" + this.season + "&team_ids[]=" + this.team_ids + "&postseason=true&per_page=100&page=1")
                ])
                    .then(axios.spread((regular_season_response, postseason_response) => {
                        this.cardDisplayCleanup(regular_season_response.data.data).forEach((item) => {
                            (item.status.toUpperCase() == "FINAL") ? this.regularSeasonCompletedData.push(item) : this.regularSeasonUpcomingData.push(item);
                            // if status is in ["1st Qtr", "2nd Qtr", "3rd Qtr", "4th Qtr"] push game to currentGameData?
                        });

                        this.cardDisplayCleanup(postseason_response.data.data).forEach((item) => {
                            (item.status.toUpperCase() == "FINAL") ? this.postSeasonCompletedData.push(item) : this.postSeasonUpcomingData.push(item);
                            // if status is in ["1st Qtr", "2nd Qtr", "3rd Qtr", "4th Qtr"] push game to currentGameData?
                        });
                    }))
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.displaySpinner = false;
                        this.displayTabs = true;
                    })
            }
        },

        methods: {
            /* 
            * for each item, format date to YYYY-MM-DD and retroize team(s) as needed
            * return array of cards by ascending date order
            */
            cardDisplayCleanup(array) {
                array.forEach((item) => {
                    item.date = this.dateFormatter(item.date);
                    item.home_team.full_name = nameRetroizer(this.season, item.home_team.full_name);
                    item.home_team.abbreviation = abbreviationRetroizer(this.season, item.home_team.abbreviation);
                    item.visitor_team.full_name = nameRetroizer(this.season, item.visitor_team.full_name);
                    item.visitor_team.abbreviation = abbreviationRetroizer(this.season, item.visitor_team.abbreviation);
                });

                return array.slice()
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
            },

            dateFormatter(timestamp) {
                return timestamp.slice(0, -14);
            },

            // Leaving here in case a potential solution for sorting API data becomes available in future
            // format params that need to be passed as an array into API 
            // queryStringBuilder(data) {
            //     let queryString = "";
            //     for(let i = 0; i < data.length; i++) {
            //         queryString += "seasons[]=" + data[i] + "&";
            //     }

            //     // remove last "&" symbol
            //     queryString = queryString.slice(0, -1);

            //     return queryString;
            // },
        }
    };
</script>