import {
  createRouter,
  createWebHashHistory,
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
    path: "/patrons",
    name: "Patrons",
    beforeEnter: ifAuthenticated,
    component: () =>
      import(/* webpackChunkName: "Patrons"  */ "../views/Patrons.vue"),
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
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
