<template>
  <div class="my-container">
    <!-- 顶部登录/祖册盒子 - 已登录 -->
    <div v-if="user" class="header user-info">
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <!-- 头像设置 -->
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <!-- 用户昵称 -->
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <!-- 编辑资料按钮 -->
          <van-button round type="default" size="mini">编辑资料</van-button>
        </div>
      </div>
      <!-- 个人数据 -->
      <div class="hobby-info">
        <van-grid>
          <van-grid-item text="头条">
            <template #icon>
              <div>{{ userInfo.art_count }}</div>
            </template>
          </van-grid-item>
          <van-grid-item text="关注">
            <template #icon>
              <div>{{ userInfo.follow_count }}</div>
            </template>
          </van-grid-item>
          <van-grid-item text="粉丝">
            <template #icon>
              <div>{{ userInfo.fans_count }}</div>
            </template>
          </van-grid-item>
          <van-grid-item text="获赞">
            <template #icon>
              <div>{{ userInfo.like_count }}</div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 顶部登录/祖册盒子 - 未登录 -->
    <div v-else class="header not-login">
      <!-- 跳转登录页面 -->
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="../../assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <!--
      1. 一般属性里的值都为字符串
      2. 如果希望传递的是一个固定值，但它有不是字符串类型时，需要借用动态属性的v-bind:
    -->
    <van-grid class="grid-nav mb-10" :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i slot="icon" class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 单元格导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-10" />
    <van-cell v-if="user" title="退出登录" class="logout-cell" clickable @click="onLogout" />
  </div>
</template>

<script>
// 通过内置的 mapState 方法，获取vuex中state全局数据
import { mapState } from 'vuex'
import { getUserInfoAPI } from '../../api/index.js'

export default {
  name: 'myIndex',
  data () {
    return {
      userInfo: {}
    }
  },

  computed: {
    ...mapState(['user'])
  },

  created () {
    // 如果用户登录了，则请求用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },

  methods: {
    // 通过token获取用户信息
    async loadUserInfo () {
      try {
        const res = await getUserInfoAPI()
        console.log(res.data.data)
        this.userInfo = res.data.data
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },

    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出？'
      }).then(() => {
        // on confirm
        // 点击确认触发
        // 退出登录 - 清空登录状态 - 删除vuex容器与本地存储中的user
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
        // 点击取消触发
      })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  padding-bottom: 100px;

  .header {
    min-height: 360px;
    background: url('../../assets/banner.png');
    background-size: cover;
  }

  .base-info {
    padding: 76px 30px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .avatar {
        width: 130px;
        height: 130px;
        border: 4px solid #fff;
        margin-right: 24px;
      }

      .name {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .hobby-info {
    [class*=van-hairline]::after {
      border: unset;
    }

    /deep/.van-grid-item__content::after {
      border: unset;
    }

    /*
      如果说，通过UI组件库设置的组件库自定义的类名样式不生效时，可以使用 /deep/ 来进行深度设置
    */
    /deep/.van-grid-item__content {
      background-color: unset;
      color: #fff;

      .van-grid-item__text {
        color: #fff;
      }
    }
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      // 改变flex布局的主轴， 从横向改成纵向
      flex-direction: column;

      .mobile-img {
        width: 130px;
        height: 130px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .grid-nav {
    .toutiao {
      font-size: 45px;
    }

    .toutiao-shoucang {
      color: #eb5253;
    }

    .toutiao-lishi {
      color: #ff9d1d;
    }

    /deep/.van-grid-item__text {
      font-size: 30px;
    }
  }

  .logout-cell {
    text-align: center;
    color: #eb5253;
  }
}
</style>
