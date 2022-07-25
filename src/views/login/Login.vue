<template>
  <div class="login-container">
    <!--? 导航栏 -->
    <van-nav-bar title="登录" />

    <!--? 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
      v-model="user.mobile"
      name="手机号"
      label="手机号"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写手机号' }]">
      <template #left-icon>
        <i class="toutiao toutiao-shouji"></i>
      </template>
      </van-field>
      <van-field
      v-model="user.code"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入验证码"
      :rules="[{ required: true, message: '请填写密码' }]">
      <!--? slot属性是老版vue的插槽写法, 这种slot写法在慢慢被淘汰,虽然现在还没有废弃,但也是迟早的事 -->
      <!--? 如果作为一个标签,且不需要用到作用域插槽的内容是可一件减少代码量 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

        <!--? 验证码按钮 -->
        <template #button>
          <van-button size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>

      <!--? 修改登录按钮的样式 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn"  block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/*
  1.发现登录页面的路由为 login => 进入我们项目是会自动的从根路由跳转到 '/login'路由 => redirect重新定向
  2. login登录页面功能,是否写在'app.vue' 页面 => 不是的,需要新建login.vue组件,通过router-view组件进行切换
*/

// 引入接口
import { loginAPI } from '../../api/index.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      console.log('submit', this.user)
      // const res = await loginAPI({
      //   mobile: this.user.mobile,
      //   code: this.user.code
      // })
      // console.log('登录成功', res)

      try {
        // 采用对象赋值的完整写法,其目的是以后回过头来看代码时,可以更加快速的定位到需求/问题
        const res = await loginAPI({
          mobile: this.user.mobile,
          code: this.user.code
        })
        console.log('登录成功', res)
      } catch (err) {
        // 通过观察err返回的结果,可以发现 错误信息来源于err.response
        // console.log(err, '错误代码')
        // 通过 err.response中的数据, 来进行错误请求时的提示
        if (err.response.status === 400) {
          console.log('手机号或验证码错误', err)
        } else {
          console.log('系统错误,请稍后再试', err)
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  .toutiao {
    font-size:32px;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6bd4fb;
      border: none;
    }
  }
}
</style>
