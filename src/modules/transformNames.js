export const transformNames = function(season, team) {
    // Seattle SuperSonics
    if(team == "OKC") {
        return (season < 2008) ? "SEA" : team;
        // this.gameData.forEach((item) => {
            // item.home_team.full_name = (item.home_team.abbreviation == "OKC") ? "Seattle SuperSonics" : item.home_team.full_name;
            // item.visitor_team.full_name = (item.visitor_team.abbreviation == "OKC") ? "Seattle SuperSonics" : item.visitor_team.full_name;
            // item.home_team.abbreviation = (item.home_team.abbreviation == "OKC") ? "SEA" : item.home_team.abbreviation;
            // item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "OKC") ? "SEA" : item.visitor_team.abbreviation;
        // })
    }

    // San Diego Clippers
    if(team == "LAC") {
        return (season < 1984) ? "SDC" : team;
    //     this.gameData.forEach((item) => {
    //         item.home_team.full_name = (item.home_team.abbreviation == "LAC") ? "San Diego Clippers" : item.home_team.full_name;
    //         item.visitor_team.full_name = (item.visitor_team.abbreviation == "LAC") ? "San Diego Clippers" : item.visitor_team.full_name;
    //         item.home_team.abbreviation = (item.home_team.abbreviation == "LAC") ? "SDC" : item.home_team.abbreviation;
    //         item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "LAC") ? "SDC" : item.visitor_team.abbreviation;
    //     })
    }

    // Kansas City Kings
    if(team == "SAC") {
        return (season < 1985) ? "KCK" : team;
    //     this.gameData.forEach((item) => {
    //         item.home_team.full_name = (item.home_team.abbreviation == "SAC") ? "Kansas City Kings" : item.home_team.full_name;
    //         item.visitor_team.full_name = (item.visitor_team.abbreviation == "SAC") ? "Kansas City Kings" : item.visitor_team.full_name;
    //         item.home_team.abbreviation = (item.home_team.abbreviation == "SAC") ? "KCK" : item.home_team.abbreviation;
    //         item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "SAC") ? "KCK" : item.visitor_team.abbreviation;
    //     })
    }

    // Vancouver Grizzlies
    if(team == "MEM") {
        return (season < 2001) ? "VAN" : team;
    //     this.gameData.forEach((item) => {
    //         item.home_team.full_name = (item.home_team.abbreviation == "MEM") ? "Vancouver Grizzlies" : item.home_team.full_name;
    //         item.visitor_team.full_name = (item.visitor_team.abbreviation == "MEM") ? "Vancouver Grizzlies" : item.visitor_team.full_name;
    //         item.home_team.abbreviation = (item.home_team.abbreviation == "MEM") ? "VAN" : item.home_team.abbreviation;
    //         item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "MEM") ? "VAN" : item.visitor_team.abbreviation;
    //     })
    }

    // New Jersey Nets
    if(team == "BKN") {
        return (season < 2012) ? "NJN" : team;
    //     this.gameData.forEach((item) => {
    //         item.home_team.full_name = (item.home_team.abbreviation == "BKN") ? "New Jersey Nets" : item.home_team.full_name;
    //         item.visitor_team.full_name = (item.visitor_team.abbreviation == "BKN") ? "New Jersey Nets" : item.visitor_team.full_name;
    //         item.home_team.abbreviation = (item.home_team.abbreviation == "BKN") ? "NJN" : item.home_team.abbreviation;
    //         item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "BKN") ? "NJN" : item.visitor_team.abbreviation;
    //     })
    }

    // New Orleans/Oklahoma City Hornets
    if(team == "NOP" && (season === 2005 || season === 2006)) {
         return "NOK";
    // New Orleans Hornets
    } else if(team == "NOP" && season < 2013) {
        return "NOH";
    

    // if(season < 2013) {
    //     // New Orleans/Oklahoma City Hornets
    //     if(season === 2005 || season === 2006) {
    //         this.gameData.forEach((item) => {
    //             item.home_team.full_name = (item.home_team.abbreviation == "NOP") ? "New Orleans/Oklahoma City Hornets" : item.home_team.full_name;
    //             item.visitor_team.full_name = (item.visitor_team.abbreviation == "NOP") ? "New Orleans/Oklahoma City Hornets" : item.visitor_team.full_name;
    //             item.home_team.abbreviation = (item.home_team.abbreviation == "NOP") ? "NOK" : item.home_team.abbreviation;
    //             item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "NOP") ? "NOK" : item.visitor_team.abbreviation;
    //         })
    //     } else {
    //         // New Orleans Hornets
    //         this.gameData.forEach((item) => {
    //             item.home_team.full_name = (item.home_team.abbreviation == "NOP") ? "New Orleans Hornets" : item.home_team.full_name;
    //             item.visitor_team.full_name = (item.visitor_team.abbreviation == "NOP") ? "New Orleans Hornets" : item.visitor_team.full_name;
    //             item.home_team.abbreviation = (item.home_team.abbreviation == "NOP") ? "NOH" : item.home_team.abbreviation;
    //             item.visitor_team.abbreviation = (item.visitor_team.abbreviation == "NOP") ? "NOH" : item.visitor_team.abbreviation;
    //         })
    //     }
    }

    // Charlotte Bobcats
    // if(season > 2004 && season < 2014) {
    //     this.gameData.forEach((item) => {
    //         item.home_team.full_name = (item.home_team.abbreviation == "CHA") ? "Charlotte Bobcats" : item.home_team.full_name;
    //         item.visitor_team.full_name = (item.visitor_team.abbreviation == "CHA") ? "Charlotte Bobcats" : item.visitor_team.full_name;
    //     })
    // }

    // return incoming team if it doesn't fall into any of the conditions above...
    return team;
}