import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayersView from "../views/PlayersView.vue";
import GamesView from "../views/GamesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
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
    name: "Players",
    component: PlayersView,
  },
  {
    path: "/games",
    name: "Games",
    component: GamesView,
  },
];

// use hash mode since app is deployed to github pages (GP), and GP doesn't support SPA OoB
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// set proper <title> whenever route is accessed
router.beforeEach((to, from, next) => {
    document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`;
    next();
    // explicitly return false to cancel the navigation
    return false
});

export default router;
