<template>
	<view id="movie-detail">
		<!-- 自定义导航栏 -->
		<cmd-nav-bar 
			:fixed="false" 
			background-color="#fff"
			font-color="#000"
			back 
			:title="title">
		</cmd-nav-bar>
		<view class="wrapper">
			<view class="movie-info">
				<view class="left">
					<image :src="imgUrl" mode="widthFix"></image>
				</view>
				<view class="right">
					<text class="title">{{title}} ({{year}})</text>
					<text class="desc">{{genres}} / {{countries}} / {{pubdates}}上映 / 片长{{durations}}</text>
					<view class="btn">
						<navigator url="../want-to-see/want-to-see"><text class="w-iconfont">&#xe639;</text>想看</navigator>
						<navigator url="../had-seen-already/had-seen-already"><text class="w-iconfont">&#xe626;</text>看过</navigator>
					</view>
				</view>
			</view>
			<view class="rating-card">
				<view class="title">
					<text>豆瓣评分&#8482;</text>
					<text class="w-iconfont">&#xe79a;</text>
				</view>
				<view class="content">
					<view class="rating-score">
						<text>{{rating}}</text>
						<view class="rating-wrap">
							<view v-for="item in [1,2,3,4,5]" :key="item" >
								<image :src="average>=item?'../../static/images/star_1.png':'../../static/images/star_0.png'" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import graceStar from "../../graceUI/components/graceStar.vue";
export default {
	components: {
		graceStar
	},
	data(){
		return{
			title: '',
			countries: '',
			durations: '',
			genres: '',
			imgUrl: '',
			pubdates: '',
			year: '',
			rating: '',
			average: '',
		}
	},
	onLoad(option) {
		uni.request({
			url: 'https://douban.uieee.com/v2/movie/subject/' + option.movieId,
			method: 'GET',
			header:{
				"Content-Type":"application/xml"
			},
			success: res => {
				console.log(res.data)
				this.title = res.data.title;
				res.data.countries.map((item)=>{
					this.trim(this.countries += item + ' ');
				});
				res.data.genres.map((item)=>{
					this.trim(this.genres += item + ' ');
				})
				this.durations = res.data.durations[0];
				this.pubdates = res.data.pubdates[0];
				this.imgUrl = res.data.images.large;
				this.year = res.data.year;
				this.rating = res.data.rating.average;
				this.average = this.ratingStar(res.data.rating.average);
				console.log(this.average)
			},
			fail: (error) => {
				console.log(error);
			},
		});
	},
	methods: {
		//删除左右两端的空格
		trim(str){ 
　　     	return str.replace(/(^\s*)|(\s*$)/g, "");
　　 	},
		ratingStar(ratingAvg){
			return Number(ratingAvg/2).toFixed();
		}
	}
}
</script>
<style lang="scss" scoped>
	.iconfont{
		width: 50upx;
		height: 50upx;
	}
	#movie-detail{
		.wrapper{
			padding: 25upx;
			background-color: aliceblue;
			.movie-info{
				display: flex;
				.left{
					image{
						width: 169upx;
						height: 220upx;
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					padding-left: 25upx;
					.title{
						font-size: 36upx;
						font-weight: bold;
					}
					.desc{
						font-size: 22upx;
						color: #333;
						margin: 25upx 0;
					}
					.btn{
						display: flex;
						align-items: center;
						margin-left: 40upx;
						navigator{
							margin-right: 25upx;
							border-radius: 10upx;
							width: 200upx;
							height: 60upx;
							background-color: #fff;
							display: flex;
							justify-content: center;
							align-items: center;
							text{
								margin-right: 10upx;
								display: flex;
								justify-content: center;
								align-items: center;
								color: orange;
							}
						}
					}
				}
			}
			.rating-card{
				padding: 15upx;
				background-color: #fff;
				border-radius: 20upx;
				padding: 0 25upx;
				margin-top: 35upx;
				.title{
					display: flex;
					justify-content: space-between;
				}
				.content{
					display: flex;
					justify-content: center;
					align-items: center;
					.rating-score{
						.rating-wrap{
							display: flex;
							justify-content: center;
							align-items: center;
							width: 100upx;
							image{
								width: 20upx;
								height: 20upx;
								margin: 10upx;
							}
						}
					}
				}
			}
		}
	}
</style>