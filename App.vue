<script>
	export default {
		onLaunch: function (options) {
			console.log('App Launch');
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
@import "./graceUI/graceUI.css";

/* 自定义阿里iconfont矢量图标 */
@font-face {
  font-family: 'w-iconfont';  /* project id 1118074 */
  src: url('//at.alicdn.com/t/font_1118074_wfxftjid7bf.eot');
  src: url('//at.alicdn.com/t/font_1118074_wfxftjid7bf.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1118074_wfxftjid7bf.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1118074_wfxftjid7bf.woff') format('woff'),
  url('//at.alicdn.com/t/font_1118074_wfxftjid7bf.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1118074_wfxftjid7bf.svg#iconfont') format('svg');
}
.w-iconfont {
  font-family:"w-iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
