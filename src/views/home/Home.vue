<template>
  <div class="home-container">
    <!-- 顶部搜索 - 标题 -->
    <van-nav-bar class="page-nav-bar" title="标题" fixed>
      <template #title>
        <van-button
          class="search-btn"
          round
          icon="search"
          type="info"
          to="/search"
        >搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- tab频道列表 -->
    <!--
      v-model: 绑定当前激活标签对应的索引值，默认启用第一个标签
      animated：开启切换标签内容时的转场动画
      swipeable：开启滑动切换标签页（一般体现在移动端）
      swipe-threshold: 设置最低滑动标签数 - 越小越好
     -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable swipe-threshold="2">
      <van-tab
        v-for="obj in channels"
        :key="obj.id"
        :title="obj.name"
      >
        <!-- 放一个内容列表的组件 -->
        <article-list :channel="obj"></article-list>
      </van-tab>
      <template #nav-right>
        <!-- 创建以下小盒子的目的 - 占位，通过透明盒子的站位，让最右侧的汉堡标签不会遮挡滚动的实际标签样式 -->
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <!-- 频道编辑底部弹出 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 2创建组件 -->
      <channel-edit
        :myChannels="channels"
        :active="active"
        :allChannels="allChannels"
        @update-active="onUpdateActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI } from '../../api/index.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '../../utils/storage.js'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false, // 底部频道编辑开启状态
      allChannels: [] // 全部频道列表
    }
  },

  computed: {
    ...mapState(['user'])
  },

  created () {
    // 调用获取频道列表方法
    this.loadChannels()

    // 调用获取全部平道列表的方法
    this.loadAllChannels()
  },

  methods: {
    // 获取用户当前频道列表
    async loadChannels () {
      try {
        // if (this.user) {
        //   // 已登录状态，调用接口
        //   // 以后调用接口获取返回值时，请使用结构赋值的形式拿到真实的返回参数
        //   const { data: res } = await getUserChannelsAPI()
        //   this.channels = res.data.channels
        // } else {
        //   // 未登录状态
        //   // 获取本地频道列表
        //   const localChannels = getItem('TOUTIAO_CHANNELS')
        //   if (localChannels) {
        //     // 有本地列表
        //     this.channels = localChannels
        //   } else {
        //     // 没有本地列表
        //     const { data: res } = await getUserChannelsAPI()
        //     this.channels = res.data.channels
        //   }
        // }

        // 优化上面的3中不同情况
        let channelsTemp = [] // 临时列表数据，最后会将它赋值给this.channels
        const localChannels = getItem('TOUTIAO_CHANNELS') // 获取本地列表
        if (this.user || !localChannels) {
          // 登录 或者 本地没有存储时， 获取后端数据
          const { data: res } = await getUserChannelsAPI()
          channelsTemp = res.data.channels
        } else {
          // 除上面条件以外，均可以使用本地列表数据
          channelsTemp = localChannels
        }

        // 将临时列表赋值给真实列表
        this.channels = channelsTemp
      } catch (error) {
        this.$toast('获取平道列表数据失败')
      }
    },

    async loadAllChannels () {
      try {
        const { data: res } = await getAllChannelsAPI()
        this.allChannels = res.data.channels
      } catch (error) {
        this.$toast('获取全部频道数据失败')
      }
    },

    // 自定义组件事件
    onUpdateActive (index, isShow = false) {
      // 1. 修改active当前选中的频道
      this.active = index
      // 2. 将弹出层关闭
      this.isChannelEditShow = isShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // vue2
  // /deep/.van-nav-bar__title {
  //   max-width: unset;
  // }

  // vue3
  // ::v-deep .van-nav-bar__title {
  //   max-width: unset;
  // }

  :deep(.van-nav-bar__title) {
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

    // 删除以下内容
    // .van-tabs__content {
    //   position: fixed;
    //   top: 174px;
    // }

    .van-tab {
      border-right: 1px solid #edeff3;
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
      flex-shrink: 0; /* flex布局需要用flex-shrink取消该元素在flex布局的计算 */
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: rgba(255, 255, 255, 0.9);

      &:before {
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

  // 弹出层样式
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
