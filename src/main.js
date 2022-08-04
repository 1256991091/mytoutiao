import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 动态设置rem加载
import 'amfe-flexible'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载全局样式配置 - 自定义样式表需要写在UI组件样式表的下面，防止被覆盖
import './styles/index.less'

// 引入dayjs配置文件
import './utils/dayjs.js'

// 引入lodash
import _ from 'lodash'

// 构建新的方法让全局使用
Vue.prototype.$_ = _

Vue.use(Vant)

/*
  全局过滤器的创建
  Vue.filter('自定义过滤器的名称', (value: 使用过程中组件传递过来的参数) => {
    return 通过过滤器的业务逻辑处理后的数据结果
  })

  局部过滤器
  export default {
    filters: {
      '自定义过滤器的名称' (value: 使用过程中组件传递过来的参数) {
        return  通过过滤器的业务逻辑处理后的数据结果
      }
    }
  }
*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
