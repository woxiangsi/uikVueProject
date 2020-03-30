
<template>
  <div class="Recommended-wrap">
    <!-- <TopNav title="VR内饰全景"></TopNav> -->
    <!-- <div
      class="back_btn iconfont icon-sd1"
      
      style=" right: 11px; top:86px; width:36px; height:36px; line-height: 36px;font-size:28px; border: 1.2px solid rgba(43, 43, 43, 0.4);"
      @click="gobacks"
    ></div>
    <div
      class="back_btn iconfont icon-sd1"
      style=" right: 20px; top:60px; width:26px; height:26px; line-height: 26px;font-size:22px; border: 1.2px solid rgba(43, 43, 43, 0.4);"
      @click="gobacks"
    ></div> -->
    <iframe id="mainIframe" ref="mainIframe" name="mainIframe" src="./static/tour/index.html" class="vr_box" frameborder="0" scrolling="auto"></iframe>
  </div>
</template>

<script>
// import vr from './vr'
// export default {
//   // v-if="checkIosAndroidIpad() != 'ios'"
//   ...vr
// }
export default {
  name: 'hello',
  data() {
    return {
      iframeState: false,
      goBackState: false,
      webAddress: [
        {
          name: '简书',
          link: '~@/assets/tour/index.html'
        }
      ]
    }
  },
  mounted() {
    // const oIframe = document.getElementById('show-iframe')
    // const deviceWidth = document.documentElement.clientWidth
    // const deviceHeight = document.documentElement.clientHeight
    // oIframe.style.width = deviceWidth + 'px'
    // oIframe.style.height = deviceHeight + 'px'

    var vrModelCode = this.$route.query.vrModelCode
    // this.vrFiles = this.$route.query.vrFiles
    console.log('vrModelCode--',vrModelCode)
    const mapFrame = this.$refs['mainIframe']
    if (mapFrame.attachEvent) { // 兼容浏览器判断
      mapFrame.attachEvent('onload', function() {
        const iframeWin = mapFrame.contentWindow
        iframeWin.postMessage(vrModelCode, '*')
        // data 传递的参数   * 写成子页面的域名或者是 ip
      })
    } else {
      mapFrame.onload = function() {
        const iframeWin = mapFrame.contentWindow
        iframeWin.postMessage(vrModelCode, '*')
      }
    }
  },
  methods: {
    goBack() {
      this.goBackState = false
      this.iframeState = false
    },
    showIframe() {
      this.goBackState = true
      this.iframeState = true
    },
    gobacks() {
      this.$router.go(-1)
    },
  }
}

</script>
<style lang="scss"></style>
<style lang="scss" scoped>
@import './vr.scss';
</style>
