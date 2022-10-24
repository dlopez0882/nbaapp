import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayersView from "../views/PlayersView.vue";
import GamesView from "../views/GamesView.vue";

const routes = [
  {
    path: "/",
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
    path: "/players",
    name: "players",
    component: PlayersView,
  },
  {
    path: "/games",
    name: "games",
    component: GamesView,
  },
];

const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory('/nbaapp/'),
  routes,
});

export default router;
