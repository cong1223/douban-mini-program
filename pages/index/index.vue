<template>
	<view class="wrapper">
		<view style="width:96%; padding:20upx 2%; background:#00C777; flex-wrap:nowrap;">
			<view class="search" @tap="skipSearch">
				<image src="../../static/images/sousuo.png"></image>
				<text class="flex-center">搜索</text>
			</view>
		</view>
		<view class="sort-list">
			<view id="hot-showing">
				<movie-item :movieData="hotShowingData" sort="影院热映"></movie-item>
			</view>
			<view id="top250">
				<movie-item :movieData="top250" sort="Top250"></movie-item>
			</view>
			<view id="coming-soon">
				<movie-item :movieData="comingSoon" sort="即将上映"></movie-item>
			</view>
			<view id="new-of-ist">
				<movie-item :movieData="newList" sort="新片榜"></movie-item>
			</view>
			<view id="public-praise-list">
				<movie-item :movieData="publicPraiseList" sort="本周口碑榜"></movie-item>
			</view>
		</view>
	</view>
</template>

<script>
import movieItem from '../../components/movie-item.vue'
export default {
	components: {
		movieItem,
	},
	data() {
		return {
			// 热映电影前四条内容信息
			hotShowingData: [],
			top250: [],
			comingSoon: [],
			newList: [],
			publicPraiseList: []
		};
	},
	onLoad() {
		// 获取正在热映的电影信息
		this.getHotShowing();
		this.getTop250();
		this.getComingSoon();
		this.getNewList();
		this.getPublicPraise();
	},
	methods: {
		// 点击搜索跳转到搜索页面
		skipSearch() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		// 请求获取正在热映的电影信息
		getHotShowing() {
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/in_theaters',
				method: 'GET',
				header:{
					"Content-Type":"application/xml"
				},
				data: {
					start: 0,
					count: 20,
					city: '杭州'
				},
				success: res => {
					this.hotShowingData = res.data.subjects;
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求top250的电影信息
		getTop250() {
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/top250',
				method: 'GET',
				header:{
					"Content-Type":"application/xml"
				},
				data: {
					start: 0,
					count: 20,
				},
				success: res => {
					this.top250 = res.data.subjects;
					// console.log(this.top250)
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求即将上映的电影信息
		getComingSoon() {
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/coming_soon',
				method: 'GET',
				header:{
					"Content-Type":"application/xml"
				},
				data: {
					start: 0,
					count: 20,
				},
				success: res => {
					this.comingSoon = res.data.subjects;
					// console.log(this.comingSoon)
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求新片榜的电影信息
		getNewList() {
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a',
				method: 'GET',
				header:{
					"Content-Type":"application/xml"
				},
				success: res => {
					this.newList = res.data.subjects;
					// console.log(this.newList)
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求本周口碑榜的电影信息
		getPublicPraise() {
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/weekly',
				method: 'GET',
				header:{
					"Content-Type":"application/xml"
				},
				success: res => {
					let list = res.data.subjects;
					list.map((item)=>{
						this.publicPraiseList.push(item.subject);
					})
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
	}
};
</script>

<style lang="scss">
.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.search {
	background-color: #fff;
	border-radius: 10px;
	height: 60upx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #8a8a8a;
	image {
		width: 40upx;
		height: 40upx;
		margin-right: 10upx;
	}
}
#hot-showing{
	.grace-items{
		width: 169upx;
		.movie-item{
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
