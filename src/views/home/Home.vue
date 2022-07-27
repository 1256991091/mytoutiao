<template>
  <div class="home-container">
    <!--? 标题 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button
        class="search-btn"
        round
        icon="search"
        type="info"
        >搜索</van-button>
      </template>
    </van-nav-bar>
    <!--? tab频道列表 -->
    <!--
        ? v-model:绑定当前激活标签对应的索引值,默认启动第一个标签
        ? animated: 开启切换标签内容时的转场动画
        ? swipeable: 开启滑动切换标签页 (一体现在移动端)
        ? swipe-threshold: 设置最低标准,越低越好
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable swipe-threshold="2">
      <van-tab
      v-for="obj in channels"
      :key="obj.id"
      :title="obj.name"
      >
      <!--? 中间放一个组件 -->
        <ArticleList :channel="obj"></ArticleList>
      </van-tab>
      <template #nav-right>
        <!--? 创建以下小盒子的目的 -占位,通过透明盒子的站位,让最右侧的标签图标不会遮挡滚动的标签样式 -->
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '../../api/index.js'
import ArticleList from './components/article-list.vue'
export default {
  name: 'home-vue',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  created () {
    // 调取获取频道列表的方法
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        // 以后调用接口获取返回值是,请使用结构赋值的形式拿到真实的返回参数
        const { data: res } = await getUserChannelsAPI()
        // console.log(res)
        this.channels = res.data.channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    background-color: #5babfb;
    border: none;
    width: 555px;
    height: 64px;
    font-size: 28px;
    .van-icon {
      color: #fff;
      font-size: 28px;
    }
  }
  :deep(.channel-tabs) {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }

    .van-tab {
      border-right:1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }

    .van-tab--active {
      color: #333;
      font-weight: 700;
    }
    .van-tabs__line {
      width: 32px;
      background-color: #5babfb;
    }
    .placeholder {
      width: 66px;
      flex-shrink: 0; // flex布局需要用flex-shrink取消该元素在flex布局的计算
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: rgba(255 255 255);
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 58px;
        background-image: url(../../assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
