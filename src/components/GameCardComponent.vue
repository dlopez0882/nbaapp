<template>
    <div class="card">
        <div class="card-header">{{ data.visitor_team.full_name }} at {{ data.home_team.full_name }}</div>
        <div v-if="data.visitor_team_score == 0 && data.home_team_score == 0" class="card-body">
            <p>Date: {{ data.date }} @ {{ data.status }}</p>
        </div>
        <div v-else class="card-body">
            <p>Date: {{ data.date }}</p>
            <p v-html="highlightWinner(data.visitor_team.abbreviation, data.visitor_team_score, data.home_team.abbreviation, data.home_team_score, this.checkIfOvertimeStatus(data.period, data.status), data.time)"></p>
            <p><a href="javascript:void(0)" @click="this.$parent.showStatsModal(data.id, data.visitor_team.abbreviation, data.home_team.abbreviation, data.date)" @keydown.esc="this.$parent.hideStatsModal()">View game stats</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GameCardComponent",

        props: {
            data: Object,
        },

        methods: {
            // highlights the winning team's score if game status is finalized
            highlightWinner(visitorTeam, visitorScore, homeTeam, homeScore, gameStatus, gameTime) {
                return (gameStatus.toUpperCase().includes('FINAL'))  ? 
                    (visitorScore > homeScore) ?
                        `Score: <strong>` + visitorTeam + ` ` + visitorScore + `</strong> | ` + homeTeam + ` ` + homeScore + ` (` + gameStatus + `)` : 
                        `Score: ` + visitorTeam + ` ` + visitorScore + ` | <strong>` + homeTeam + ` ` + homeScore + `</strong> (` + gameStatus + `)`
                    : visitorTeam + ` ` + visitorScore + ` | ` + homeTeam + ` ` + homeScore + ` (` + gameTime + `)`
            },

            checkIfOvertimeStatus(period, status) {
                let overtimeCount = period-4;
                // proper OT report is "Final OT", "Final 2OT", "Final 3OT", etc.
                status = (overtimeCount > 0) ? 
                    (overtimeCount == 1) ? status + ' OT' : status + ' ' + overtimeCount + 'OT' :
                    status;
                return status;
            },
        }
    }
</script>