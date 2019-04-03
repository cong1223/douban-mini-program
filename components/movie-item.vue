<template>
	<view id="movie-item">
		<view :class="home ? 'top index' : 'top'">
			<view class="title">{{ sort }}</view>
			<text class="more" @click="skipToLookAll(sort)" :style="{'display': more ? 'inline' : 'none'}">查看更多&gt;</text>
		</view>
		<view class="scroll-box">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view :class="home ? 'item-block item-block-home' : 'item-block'" v-for="item in movieData" :key="item.id">
					<view class="wrap" v-if="mode == 'movie'">
						<image :lazy-load="true" class="item-img" @click="skipMovieDetail(item.id)" :src="item.images.large" mode="widthFix"></image>
						<text class="name">{{ item.title }}</text>
						<view class="rating">
							<graceStar :score="item.rating.average" :value="(item.rating.average/2).toFixed()" :canTap="false"></graceStar>
						</view>
					</view>
					<view class="wrap" v-if="mode == 'actor'">
						<image :lazy-load="true" class="item-img" :src="item.avatars.large" mode="widthFix"></image>
						<text class="name">{{ item.name }}</text>
						<text class="role">{{ item.role }}</text>
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
	props: {
		movieData: {
			type: Array,
			default: function(){
				return [];
			}
		},
		sort: {
			type: String,
			default: ''
		},
		more: {
			type: Boolean,
			default: true
		},
		mode: {
			type: String,
			default: 'movie'
		},
		home: {
			type: Boolean,
			default: false
		}
	},
	components: {
		graceStar
	},
	data() {
		return {
			top: 'top',
			index: 'index'
		}
	},
	onLoad() {
		
	},
	methods: {
		// 点击查看电影详情
		skipMovieDetail(movieId){
			uni.navigateTo({
				url: "../movie-detail/movie-detail?movieId=" + movieId
			})
		},
		skipToLookAll(sort){
			uni.navigateTo({
				url: '../look-all/look-all?title=' + sort,
			})
		}
	}
};
</script>

<style lang="scss">
#movie-item {
	$green: #00c777;
	padding: 20upx 0;
	.top {
		box-sizing: border-box;
		height: 40upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 20upx 0;
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
					margin-left: 0;
				}
				.wrap{
					display: flex;
					flex-direction: column;
					.item-img {
						width: 100%;
						height: 220upx !important;
					}
					.name {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-weight: bold;
						font-size: 22upx;
						margin-top: 15upx;
					}
					.role{
						font-size: 22upx;
					}
					.rating{
						display: flex;
						overflow: hidden;
						align-items: center;
					}
				}
			}
			.item-block-home {
				&:nth-child(1){
					margin-left: 20upx;
				}
			}
		}
	}
	.index {
		padding: 0 20upx;
	}
}
</style>
