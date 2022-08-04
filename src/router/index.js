import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由规则数组
const routes = [
  {
    path: '/', // 根路由
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: 'my',
        name: 'my',
        component: () => import('../views/my/my.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('../views/qa/qa.vue')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('../views/video/video.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // 通过懒加载的形式，来引入组件
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/article/article.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('../views/article/article.vue'),
    props: true // 开启路由的props传参，可以把路由参数映射到组件中 （目的： 保持该组件的路由传参与组件传参的接收数据形式一致）
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user-profile/user-profile.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // 下面的这种写法，是路由组件的懒加载（仅当使用到该路由组件的时候才会进行加载， 优点： 提升了项目首次渲染到页面的效率）
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
