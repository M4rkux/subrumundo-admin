import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
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

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(/* webpackChunkName: "Dashboard"  */ "../views/Dashboard.vue"),
  },
  {
    path: "/episodes",
    name: "Episodes",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(/* webpackChunkName: "Episodes"  */ "../views/Episodes.vue"),
  },
  {
    path: "/subscribers",
    name: "Subscribers",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(/* webpackChunkName: "Subscribers"  */ "../views/Subscribers.vue"),
  },
  {
    path: "/users",
    name: "Users",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(/* webpackChunkName: "Users" */ "../views/Users.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
