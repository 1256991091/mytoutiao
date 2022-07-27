<template>
  <div class="article-item">
    <van-cell>
      <!--? 标题信息 -->
      <template #title>
        <div class="title van-multi-ellipsis--l2">
          {{article.title}}
        </div>
      </template>

      <!--? 底部信息 - 三个图片 -->
      <template #label>
        <!--? 图片盒子 - 通过cover.type 来判断有几个图片 0 1 3 -->
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div
          class="cover-item"
          v-for="(img,index) in article.cover.images"
          :key="index"
          >
            <van-image
            class="right-image"
            :src="img"
            >
            </van-image>
          </div>
        </div>

        <!--? 作者信息 名称 评论数 时间 -->
        <div class="label-info-wrap">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}</span>
          <span>{{article.pubdate}}</span>
        </div>
      </template>

      <!--? 通过 default 插槽来显示 单张图片的样式表现 -->
      <template #default v-if="article.cover.type === 1">
        <van-image
          class="right-image"
          fit="cover"
          :src="article.cover.images[0]"
          >
        </van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'article-item',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.article-item {
  // 标题样式 - 多行省略通过vant默认的class类名完成的
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  // 修改右边盒子的样式结构 - 单张图片展示结构
  .van-cell__value {
    flex: unset;
    width: 230px;
    height: 146px;
    padding-left: 25px;
  }

  .right-image {
    width: 100%;
    height: 100%;
  }

  // 底部文字样式
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 20px;
  }

  // 多图样式 - 通过flex布局来等分宽度. 同时使用:not(:last-child)来不影响最后一个图片
  .cover-wrap {
    display: flex;
    padding: 30px 0;

    .cover-item {
      // 每张图片各占33% 均分
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
}
</style>
