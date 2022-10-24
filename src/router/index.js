import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayersView from "../views/PlayersView.vue";
import GamesView from "../views/GamesView.vue";

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: "/nbaapp/",
    name: "home",
    component: HomeView,
  },
//   {
//     path: "/about",
//     name: "about",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
//   },
  {
    path: "/nbaapp/players",
    name: "players",
    component: PlayersView,
  },
  {
    path: "/nbaapp/games",
    name: "games",
    component: GamesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
