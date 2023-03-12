import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import MoviesPage from '@/views/MoviesPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/movies', component: MoviesPage },
    { path: '/tv', component: MoviesPage },
    { path: '/actors', component: MoviesPage },
    { path: '/news', component: MoviesPage },
  ],
});

export default router;
