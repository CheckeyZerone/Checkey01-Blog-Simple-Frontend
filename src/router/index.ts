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
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostsView.vue'),
    },
    {
      path: '/posts/:slug',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/tags',
      redirect: '/posts',
    },
    {
      path: '/tags/:tag',
      redirect: (to) => ({
        path: '/posts',
        query: { tag: to.params.tag }
      })
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('../views/LinksView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
