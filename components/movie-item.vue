<template>
	<view id="movie-item">
		<view class="top">
			<text class="title">{{ sort }}</text>
			<text class="more">查看更多&gt;</text>
		</view>
		<view class="scroll-box">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view class="item-block" v-for="item in movieData" :key="item.id">
					<view class="wrap">
						<image class="movie-img" @click="skipMovieDetail(item.id)" :src="item.images.large" mode="widthFix"></image>
						<text class="name">{{ item.title }}</text>
						<view class="rating">
							<graceStar :value="item.rating.average/2" :canTap="false"></graceStar>
							<text class="rating-score">{{item.rating.average}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import graceStar from "../graceUI/components/graceStar.vue";
export default {
	name: 'movieItem',
	props: ['movieData', 'sort'],
	components: {
		graceStar
	},
	data() {
		return {
			
		}
	},
	methods: {
		// 点击查看电影详情
		skipMovieDetail(movieId){
			uni.navigateTo({
				url: "../movie-detail/movie-detail?movieId=" + movieId
			})
		}
	}
};
</script>

<style lang="scss" scoped>
#movie-item {
	$green: #00c777;
	padding: 20upx 0;
	.top {
		box-sizing: border-box;
		height: 40upx;
		width: 100%;
		padding: 0 20upx;
		display: flex;
		justify-content: space-between;
		.title {
			font-size: 28upx;
			font-weight: bold;
		}
		.more {
			font-size: 24upx;
			color: $green;
		}
	}
	.scroll-box{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		.scroll-view_H {
			display: flex;
			flex-wrap: nowrap;
			width: 100%;
			.item-block {
				width: 169upx;
				height: auto;
				display: inline-block;
				flex-direction: column;
				margin: 0 10upx;
				&:nth-child(1){
					margin-left: 20upx;
				}
				.wrap{
					display: flex;
					flex-direction: column;
					.movie-img {
						width: 100%;
						height: 220upx !important;
					}
					.name {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-weight: bold;
						font-size: 22upx;
					}
					.rating{
						display: flex;
						overflow: hidden;
						align-items: center;
						.rating-score{
							font-size: 18upx;
							margin-left: 5upx;
						}
					}
				}
			}
		}
	}
}
</style>
