import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: '/chat'
        },
        {
          path: '/chat',
          name: '对话',
          component: () => import('../views/chat/ChatMain.vue')
        },
        {
          path: '/image',
          name: '绘画',
          component: () => import('../views/image/ImageMain.vue')
        },
        {
          path: '/shop',
          name: '商城',
          component: () => import('../views/shop/ShopMain.vue')
        },
        {
          path: '/user',
          name: '用户中心',
          component: () => import('../views/user/UserInfo.vue')
        },
        {
          path: '/order',
          name: '订单',
          component: () => import('../views/order/OrderInfo.vue')
        }
      ]

    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/login/Login.vue')
    }
  ]
});

export default router;
