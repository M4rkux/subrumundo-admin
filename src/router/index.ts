import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
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
    name: "Home",
    component: Home,
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
