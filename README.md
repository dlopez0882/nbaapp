# NBA App

## Description

A SPA made with Vue.JS that displays information about both past and present NBA players, along with game stats.

This application was made using [Vue CLI](https://cli.vuejs.org/). Data is provided from [Free NBA API hosted on Rapid API](https://rapidapi.com/theapiguy/api/free-nba/).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


## How to Use the Project

1. Navigate to http://localhost:8080 (or any appropriate route)
2. Click on "Players" vue-router link to view player data.
3. Click on "Games" vue-router link to view game data.
    * Game data from API goes as far back as 1979-1980 NBA season.
    * Select a team and a season, and click "Show games!" button to retireve data.
    * Select either "Regular Season" or "Playoffs" tabs to view regular season or playoff game data.
        * Note: If a team did not make the playoffs in a particular season, app will show a "No playoffs data available." message
    * Click on "View game stats" link in any score card to view box score of a particular game.