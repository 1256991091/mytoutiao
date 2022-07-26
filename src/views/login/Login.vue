<template>
  <div class="login-container">
    <!--? 导航栏 -->
    <van-nav-bar class="page-nav" title="登录">
      <template #left>
        <!--? 为例模拟手机/pc的返回路由操作, $router.back() -->
        <!--?  $router.back() 能够让路由退回到前一步-->
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <!--? 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
      v-model="user.mobile"
      name="mobile"
      label="手机号"
      placeholder="手机号"
      :rules="userFormRules.mobile">
      <template #left-icon>
        <i class="toutiao toutiao-shouji"></i>
      </template>
      </van-field>
      <van-field
      v-model="user.code"
      type="number"
      name="code"
      label="验证码"
      placeholder="请输入验证码"
      :rules="userFormRules.code">
      <!--? slot属性是老版vue的插槽写法, 这种slot写法在慢慢被淘汰,虽然现在还没有废弃,但也是迟早的事 -->
      <!--? 如果作为一个标签,且不需要用到作用域插槽的内容是可一件减少代码量 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

        <!--? 验证码按钮 -->
        <template #button>
          <!--? time 倒计时 time:里面接收毫秒数 -->
          <van-count-down
            :time="1000 * 10"
            format="ss 秒"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <!--? native-type="button" 属性,防止触发表单提交事件  -->
          <!--? 创建点击事件 onSendSms-->
          <van-button
          native-type="button"
          size="small"
          type="default"
          @click="onSendSms"
          v-else
          >发送验证码</van-button>
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
import { loginAPI, getSmsCodeAPI } from '../../api/index.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false,
      userFormRules: {
        // 手机号验证规则
        // 1.必填
        // 2. 手机号的基本结构 11位 前面是1[3479] 后面9位是任意数字
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      // 发起登录时弹出加载中的遮罩,防止用心进行下一步操作
      // 将toast记载轻提示设置为持续提示状态,在请求接口响应数据后主动的关闭
      // 关闭加载弹出层的位置有两个,请求成功与失败都需要单独设置关闭方式
      const toast = this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      console.log(toast)
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
        toast.clear()
        this.$toast.success('登录成功')
        // 登录成功后需要做的业务逻辑
        // 需要把返回的两个token放到vue状态管理器中
        // 通过this.$store.commit(mutations里定义的方法名,传递的参数) 方法A区调用mutations里定义的方法
        this.$store.commit('setUser', res.data.data)

        // 通过$router.back()进行页面路由的退回
        this.$router.back()
      } catch (err) {
        toast.clear()
        // 通过观察err返回的结果,可以发现 错误信息来源于err.response
        // console.log(err, '错误代码')
        // 通过 err.response中的数据, 来进行错误请求时的提示
        if (err.response.status === 400) {
          console.log('手机号或验证码错误', err)
          this.$toast.fail('手机号或验证码错误')
        } else {
          console.log('系统错误,请稍后再试', err)
          this.$toast.fail('系统错误,请稍后再试')
        }
      }
    },
    async onSendSms () {
      // 1.验证手机号格式规范
      // 看到promise对象,就想到用async 和 await去接收处理
      // console.log(this.$refs.loginForm.validate('mobile'))
      // validate(表单控件的name属性)
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证成功')
        // 通过验证显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        console.log('验证失败', error)
      }

      // 请求发送验证接口
      try {
        // 短信功能不用关心接口调用成功的返回参数,只需要关心是否调用成功
        await getSmsCodeAPI(this.user.mobile)
        this.$toast('验证码发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          this.$toast.fail('发送过于频繁,请稍后再试')
        } else {
          this.$toast.fail('发送失败,请重试')
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
      background-color: #6db4fb;
      border: none;
    }
  }
  .page-nav {
    .van-icon {
      color: #fff;
    }
  }
}
</style>
