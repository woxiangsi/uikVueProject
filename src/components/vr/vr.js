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
    alert('1----')
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
