import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import { getToken } from '@/http/token'

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
          name: '首页',
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
          path: '/user/info',
          name: '修改用户',
          component: () => import('../views/user/ViewUser.vue')
        },
        {
          path: '/modifyPassword',
          name: '修改密码',
          component: () => import('../views/user/ModifyPassword.vue')
        },
        {
          path: '/modifyEmail',
          name: '修改邮箱',
          component: () => import('../views/user/ModifyEmail.vue')
        },
        {
          path: '/setPassword',
          name: '设置密码',
          component: () => import('../views/user/SetPassword.vue')
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
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  // 判断是否登录
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
