// a utility to retro team names
export const nameRetroizer = function(season, team) {
    // Seattle SuperSonics
    if(team == "Oklahoma City Thunder") {
        return (season < 2008) ? "Seattle SuperSonics" : "Oklahoma City Thunder";
    }

    // San Diego Clippers
    if(team == "LA Clippers") {
        return (season < 1984) ? "San Diego Clippers" : "LA Clippers";
    }

    // Kansas City Kings
    if(team == "Sacramento Kings") {
        return (season < 1985) ? "Kansas City Kings" : "Sacramento Kings";
    }

    // Vancouver Grizzlies
    if(team == "Memphis Grizzlies") {
        return (season < 2001) ? "Vancouver Grizzlies" : "Memphis Grizzlies";
    }

    // New Jersey Nets
    if(team == "Brooklyn Nets") {
        return (season < 2012) ? "New Jersey Nets" : "Brooklyn Nets";
    }

    // New Orleans/Oklahoma City Hornets
    if(team == "New Orleans Pelicans" && (season === 2005 || season === 2006)) {
        return "New Orleans/Oklahoma City Hornets";
    // New Orleans Hornets
    } else if (team == "New Orleans Pelicans" && season < 2013) {
        return "New Orleans Hornets";
    }

    // Charlotte Bobcats
    if(team == "Charlotte Hornets") {
        return (season > 2004 && season < 2014) ? "Charlotte Bobcats" : "Charlotte Hornets";
    }

    // return incoming team if it doesn't fall into any of the conditions above...
    return team;
}


// a utility to retro team abbreviations
export const abbreviationRetroizer = function(season, team)  {
    // Seattle SuperSonics
    if(team == "OKC") {
        return (season < 2008) ? "SEA" : team;
    }

    // San Diego Clippers
    if(team == "LAC") {
        return (season < 1984) ? "SDC" : team;
    }

    // Kansas City Kings
    if(team == "SAC") {
        return (season < 1985) ? "KCK" : team;
    }

    // Vancouver Grizzlies
    if(team == "MEM") {
        return (season < 2001) ? "VAN" : team;
    }

    // New Jersey Nets
    if(team == "BKN") {
        return (season < 2012) ? "NJN" : team;
    }

    // New Orleans/Oklahoma City Hornets
    if(team == "NOP" && (season === 2005 || season === 2006)) {
        return "NOK";
    // New Orleans Hornets
    } else if(team == "NOP" && season < 2013) {
        return "NOH";
    }

    // return incoming team if it doesn't fall into any of the conditions above...
    return team;
}