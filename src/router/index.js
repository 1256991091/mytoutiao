import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  // 下面这种写法,是路由组件的懒加载(仅当使用该路由组件的时候才会进行加载, 优点:  提升了项目首次渲染到页面的效率)
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
