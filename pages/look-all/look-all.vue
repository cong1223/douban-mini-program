<template>
	<view class="look-all">
		<!-- 自定义导航栏 -->
		<cmd-nav-bar 
			:fixed="true" 
			background-color="#fff"
			font-color="#000"
			back 
			:title="title">
		</cmd-nav-bar>
		<!-- 导航栏占位区开始 -->
		<cmd-nav-bar 
			:fixed="false" 
			background-color="#fff"
			font-color="#000"
		>
		</cmd-nav-bar>
		<!-- 导航栏占位区结束-->
		<view class="wrapper">
			<view class="card" v-for="item in movieData" :key="item">
				<image :lazy-load="true" class="item-img" @click="skipMovieDetail(item.id)" :src="item.images.large"></image>
				<text class="name">{{ item.title }}</text>
				<view class="rating"><graceStar :score="item.rating.average" :value="(item.rating.average / 2).toFixed()" :canTap="false"></graceStar></view>
			</view>
		</view>
	</view>
</template>

<script>
import graceStar from '../../graceUI/components/graceStar.vue';
export default {
	components: {
		graceStar
	},
	data() {
		return {
			movieData: [],
			title: ''
		};
	},
	onLoad(option) {
		this.title = option.title;
		if(option.title == '影院热映'){
			this.getHotShowing();
		}
		if(option.title == 'Top250'){
			this.getTop250();
		}
		if(option.title == '即将上映'){
			this.getComingSoon();
		}
		if(option.title == '新片榜'){
			this.getNewList();
		}
		if(option.title == '本周口碑榜'){
			this.getPublicPraise();
		}
	},
	methods: {
		// 请求获取正在热映的电影信息
		getHotShowing() {
			this.movieData = [];
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/in_theaters',
				method: 'GET',
				data: {
					start: 0,
					count: 20,
					city: '杭州'
				},
				header:{
					"content-type":"json"
				},
				success: res => {
					this.movieData = res.data.subjects;
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求top250的电影信息
		getTop250() {
			this.movieData = [];
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/top250',
				method: 'GET',
				header:{
					"content-type":"json"
				},
				data: {
					start: 0,
					count: 20,
				},
				success: res => {
					this.movieData = res.data.subjects;
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求即将上映的电影信息
		getComingSoon() {
			this.movieData = [];
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/coming_soon',
				method: 'GET',
				header:{
					"content-type":"json"
				},
				data: {
					start: 0,
					count: 20,
				},
				success: res => {
					this.movieData = res.data.subjects;
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求新片榜的电影信息
		getNewList() {
			this.movieData = [];
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a',
				method: 'GET',
				header:{
					"content-type":"json"
				},
				success: res => {
					this.movieData = res.data.subjects;
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 请求本周口碑榜的电影信息
		getPublicPraise() {
			this.movieData = [];
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/weekly',
				method: 'GET',
				header:{
					"content-type":"json"
				},
				success: res => {
					let list = res.data.subjects;
					list.map((item)=>{
						this.movieData.push(item.subject);
					})
				},
				fail: (error) => {
					console.log(error)
				},
			});
		},
		// 点击查看电影详情
		skipMovieDetail(movieId){
			uni.navigateTo({
				url: "../movie-detail/movie-detail?movieId=" + movieId
			})
		},
	},
};
</script>

<style lang="scss">
.wrapper{
	padding: 20upx;
	display: flex;
	flex-wrap: wrap;
	.card{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 176upx;
		margin: 20upx 30upx;
		.item-img{
			width: 100%;
			height: 220upx;
		}
		.name{
			font-weight: bold;
			font-size: 22upx;
			margin-top: 15upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.grace-stars{display:flex; flex-wrap:nowrap;}
		.grace-stars-items{width:15upx;margin:0 2px;}
		.grace-stars-items image{height: 100%;width:100%;}
	}
	
}
</style>
