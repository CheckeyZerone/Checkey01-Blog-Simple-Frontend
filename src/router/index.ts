import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeViews.vue'),
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: () => import('../views/PostView.vue'),
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/TagsView.vue'),
    },
    {
      path: '/tags/:tag',
      name: 'tag-post',
      component: () => import('../views/TagPostsView.vue'),
    },
  ],
})

export default router
