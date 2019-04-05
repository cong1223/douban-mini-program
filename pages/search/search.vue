<template>
    <view>
		<!-- 自定义导航栏 -->
		<cmd-nav-bar
			:fixed="true" 
			background-color="#00C777"
			font-color="#fff"
			back 
			title="搜索">
		</cmd-nav-bar>
		<!-- 导航栏占位区开始 -->
		<cmd-nav-bar
			:fixed="false" 
			background-color="#fff"
		>
		<!-- 导航栏占位区结束-->
		</cmd-nav-bar>
        <!-- 搜索条 -->
        <view style="width:96%; padding:20upx 2%; background:#00C777; flex-wrap:nowrap; position: fixed; z-index: 99;">
            <view class="grace-search">
                <view class="grace-search-in flex-center">
                    <view class="grace-search-icon"></view>
                    <input focus type="search" @input="searchChange" @confirm="searchNow" :value="searchKey" placeholder="关键字"></input>
                    <view class="grace-search-icon grace-search-clear" @tap="clearKey" v-if="searchClose"></view>
                </view>
            </view>
        </view>
		<!-- 搜索框占位 -->
		<view style="padding:20upx 2%;"><view class="grace-search"><view class="grace-search-in flex-center"></view></view></view>
		<!-- 搜索框占位结束 -->
		<!-- 搜索结果 -->
		<view class="results" v-if="showResults">
			<item-list v-for="item in results" :key="item.id" :data="item"></item-list>
		</view>
		<view class="results-null" v-if="resultsNull">
			没有搜索到相关内容~
		</view>
		<!-- 搜索结果结束 -->
        <!-- 搜索历史 -->
        <view style="width:94%; padding:15upx 3%;" v-if="!showResults">
            <view class="grace-title grace-nowrap grace-space-between">
                <view class="grace-h5">搜索历史</view>
                <view class="grace-more-r grace-search-remove" @click="clearHistory"></view>
            </view>
            <view class="grace-tips">
                <view @click="searchClick(item)" v-for="item in historyWords" :key="item">{{item}}</view>
            </view>
        </view>
    </view>
</template>
<script>
import itemList from '../../components/item-list.vue'
export default {
	components: {
		itemList
	},
    data() {
        return {
            searchKey : "",
            searchClose : false,
			results: [],
			showResults: false,
			historyWords: [],
			resultsNull: false,
        }
    },
    methods:{
        searchChange:function(e){
            var key = e.detail.value;
            this.searchKey = key;
            if(key.length >= 1){
                this.searchClose = true;
				this.showResults = true;
				this.resultsNull = false;
            }else{
                this.searchClose = false;
				this.showResults = false;
            }
        },
        clearKey:function(){
            this.searchClose = false;
			this.showResults = false;
            this.searchKey = "";
			this.historyWords = [];
        },
        searchNow:function(){
			this.showResults = true;
			this.results = [];
			this.historyWords.push(this.searchKey);
			this.historyWords = [...new Set(this.historyWords)]
            uni.showToast({
                title : '开始搜索 ' + this.searchKey,
                icon  : "none"
            });
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/search',
				method: 'GET',
				header:{
					"content-type":"json"
				},
				data: {
					q: this.searchKey
				},
				success: res => {
					if(res.data.subjects.length == 0){
						this.resultsNull = true;
						this.showResults = false;
						return;
					}
					this.results = [];
					res.data.subjects.forEach((item)=>{
						let genres = '';
						let countries = '';
						let casts = '';
						item.genres.forEach((val)=>{
							item.genres = this.$trim(genres += val + ' ');
						});
						item.countries.forEach((val)=>{
							item.countries = this.$trim(countries += val + ' ');
						});
						item.casts.forEach((val)=>{
							item.casts = this.$trim(casts += val.name + ' ');
						})
					})
					this.results = res.data.subjects;
				},
				fail: (error) => {
					console.log(error)
				},
			});
        },
		searchClick(context){
			this.searchKey = context;
			this.searchNow();
		},
		clearHistory(){
			this.historyWords = [];
		}
    }
}
</script>
<style>
page{background:#FFF;}
.flex-center{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60upx;
}
.results-null{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100upx;
}
</style>