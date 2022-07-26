<template>
  <div class="layout-container">
    <!--? 二级路由组件 -->
    <router-view></router-view>

    <!--? 底部标签导航 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa" icon="search">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="search">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        <!--? 通过插值表达式获取vuex中的user登录信息,如果user有值,则显示我的,反之显示未登录 -->
        <!--? 通过$store.state.user的方式,可以从vuex中获取到公共数据 -->
        <span>{{ $store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout-vue',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .toutiao {
    font-size: 36px;
  }
}
</style>
