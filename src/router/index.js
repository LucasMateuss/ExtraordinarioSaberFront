import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import CategoryView from "../views/CategoryView.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/categorias",
    name: "categorias",
    component: CategoryView,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/"); // Redireciona para a página de login se não estiver autenticado
    } else {
      next(); // Permite a navegação
    }
  } else if (to.path === "/" && isAuthenticated) {
    next("/categorias"); // Se já estiver autenticado, redireciona para '/categorias'
  } else {
    next(); // Permite a navegação
  }
});

export default router;
