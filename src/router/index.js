import { createRouter, createWebHistory } from 'vue-router'
import CategoryList from "@/views/settings/CategoryList.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "categories",
      component: CategoryList,
    },
    
    {
      path: "/index",
      name: "categoryIndex",
      component: () => import("../views/CategoryIndex.vue"),
    },
    {
      path: "/",
      name: "categories",
      component: () => import("@/views/settings/CategoryList.vue"),
      meta: {
        pageTitle: "Categories",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router
