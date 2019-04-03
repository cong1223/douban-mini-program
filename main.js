import Vue from 'vue'
import App from './App'
// 注册全局组件-自定义导航
import cmdNavBar from "@/components/cmd-nav-bar.vue"
Vue.component('cmd-nav-bar',cmdNavBar) 

Vue.config.productionTip = false

// 全局方法:

// 评分星星,对平均分四舍五入
Vue.prototype.$ratingStar = function(ratingAvg){
	return Number(ratingAvg/2).toFixed();
}
// 去除字符串两边空格
Vue.prototype.$trim = function(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()





