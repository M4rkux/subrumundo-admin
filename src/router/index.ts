import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Episodes from "../views/Episodes.vue";
import Subscribers from "../views/Subscribers.vue";
import Users from "../views/Users.vue";
import store from "@/store";

const ifAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (store.getters.isAuthenticated) {
    return next();
  }
  next("/login");
};

const ifNotAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!store.getters.isAuthenticated) {
    return next();
  }
  next("/");
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/episodes",
    name: "Episodes",
    component: Episodes,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/subscribers",
    name: "Subscribers",
    component: Subscribers,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: ifNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (Login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
