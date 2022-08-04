module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   // 将css配置兼容到的环境信息 仅兼容安卓4.0以上版本以及IOS8.0以上版本
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 使用postcss-pxtorom 插件，让px自动转化rem => 不可以转化style行内样式，其他的（外部样式，内部样式表）可以进行px转化rem

    // 并不是每一个项目初期就给你附带的 - 当你需要的时候，要自己来进行配置！！！
    'postcss-pxtorem': {
      // 37.5 按照iphone6的横向分辨率375的1/10，来进行配置， 也就说每1rem = 37.5px
      // propList 将所有文件中带有px的属性样式改为rem
      // 通过这个配置，就可以让设计稿与网页等比缩放
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*'],
      // include 包含， exclude 不包含
      // 可以通过exclude 去排除github-markdown第三方样式的影响
      exclude: 'github-markdown'
    }
  }
}