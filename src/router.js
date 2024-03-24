import { createMemoryHistory, createRouter } from "vue-router";

import PostsTable from "./components/PostsTable.vue";

const routes = [
  { path: "/", component: PostsTable },
  
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
