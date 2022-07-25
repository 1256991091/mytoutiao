// 在这个文件中 是创建vuex数据状态管理的场所
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage.js'
Vue.use(Vuex)

// 所有的数据内容需要写在下面的实例化对象中
export default new Vuex.Store({
  // 存储数据的地方 类比于vue文件的data
  state: {
    // 一个对象 存储当前登录用户的token数据
    user: getItem('TOKEN_KEY')
  },
  // 2.外界修改store中state属性的途径 必须通过mutations设置的方法来修改state - 类比于methods的方法
  mutations: {
    setUser (state, data) {
    /*
    state: vuex中的state里的值
    data: 外界传递到这个方法中的参数
    */
      state.user = data
      // 为了防止刷新时数据丢失,需要把数据备份到本地存储中
      setItem('TOKEN_KEY', state.user)
    }
  },
  // 3.涉及到异步操作后修改state数据时 (需要再vuex请求接口后才会修改state时) 就必须通过actions中定义的方法来调用methods中修改state的方法
  actions: {
  },
  // 4.直接当成是state的计算属性 类比于computed
  getters: {
  },
  // 5.模块化vuex 可以让每一个模块都拥有自己的state mutations actions
  modules: {
  }
})
