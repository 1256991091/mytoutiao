<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshingText" success-duration="1500">
    <!--? 内容列表 -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败,点击重新加载"
    @load="onLoad"
  >
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      <ArticleItem
      v-for="(item,index) in list" :key="index" :article="item"></ArticleItem>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '../../../api/index.js'
import ArticleItem from '../../../components/article-item.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载状态的变量,如果说这个loading为true不会触发@load事件
      finished: false, // 控制数据加载结束的标志,当finshed为true时,列表'vant-list'将不会触发@load,同时会展示 finished-text的内容在列表的底部
      timestamp: 0, // 请求下一页的数据时间戳
      error: false, // 控制列表加载失败的提示状态  - 当error为true时 @load事件不会触发
      refreshing: false, // 下拉刷新状态标记
      refreshingText: '更新成功' // 下拉刷新的提示文本
    }
  },
  methods: {
    async onLoad () {
      try {
      // 1. 请求接口数据
        const { data: res } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now() // 请求新的推荐数据事件戳,如果已经请求过,那么使用接口返回那个时间戳
        })
        // 2. 把请求结果的数据 拼接到数组list的最后 (push)
        console.log(res)
        this.list.push(...res.data.results)
        // 3. 本次数据加载结束后,需要把加载状态loading设置为结束状态
        // loading关闭后才会触发下一次的@load事件
        this.loading = false

        // 4. 通过某个条件判断出是否全部数据加载完成,需要将finished设置为true,在此之后,@load事件将永不触发
        // 当获取到的结果列表长度为0时,表示整个数据列表加载结束
        if (res.data.results.length === 0) {
          this.finished = true
        } else {
          this.timestamp = res.data.pre_timestamp
        }
      } catch (error) {
        // 展示错误提升状态
        this.error = true
        // 请求失败时,loading也需要关闭
        this.loading = false
        this.$toast('接口请求失败,请稍后再试')
      }
    },

    // 当下拉刷新的
    async onRefresh () {
      try {
        // 1.请求接口数据
        const { data: res } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // 2.将获取到的数据添加到列表的最顶端 - unshift
        this.list.unshift(...res.data.results)

        // 关闭刷新的加载状态
        this.refreshing = false

        // 更新下拉成功时的提示内容
        this.refreshingText = `刷新成功, 更新了${res.data.results.length}条数据`
      } catch (error) {
        // 关闭刷新加载状态,还要提示失败信息
        this.refreshingText = '刷新失败,请重试'
        this.refreshing = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 通过百分比设置高度,其实用的是对于父元素高度的100%,但父元素并没有设置高度
  overflow-y: auto;

  // 通过视口单位vw, vh 来设置 (用在移动端布局),不会受到父元素的影响
  height: 79vh; // (667 - (46 + 41 + 50)) / 667 约等于0.79\
}
</style>
