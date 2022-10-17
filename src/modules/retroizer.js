// a utility to retro team names
export const nameRetroizer = function(season, team) {
    switch(team) {
        case "Oklahoma City Thunder":
            return (season < 2008) ? "Seattle SuperSonics" : team;
        case "LA Clippers":
            return (season < 1984) ? "San Diego Clippers" : team;
        case "Sacramento Kings":
            return (season < 1985) ? "Kansas City Kings" : team;
        case "Memphis Grizzlies":
            return (season < 2001) ? "Vancouver Grizzlies" : team;
        case "Brooklyn Nets":
            return (season < 2012) ? "New Jersey Nets" : team;
        case "Charlotte Hornets":
            return (season > 2004 && season < 2014) ? "Charlotte Bobcats" : team;
        case "New Orleans Pelicans":
            if (season === 2005 || season === 2006) {
                return "New Orleans/Oklahoma City Hornets";
            } else if (season < 2013) {
                return "New Orleans Hornets"
            }
        default:
            return team;
    }
}


// a utility to retro team abbreviations
export const abbreviationRetroizer = function(season, team)  {
    switch(team) {
        case "OKC":
            return (season < 2008) ? "SEA" : team;
        case "LAC": 
            return (season < 1984) ? "SDC" : team;
        case "SAC":
            return (season < 1985) ? "KCK" : team;
        case "MEM":
            return (season < 2001) ? "VAN" : team;
        case "BKN":
            return (season < 2012) ? "NJN" : team;
        case "NOP":
            if (season === 2005 || season === 2006) {
                return "NOK";
            } else if (season < 2013) {
                return "NOH";
            }
        default: 
            return team;
    }

}