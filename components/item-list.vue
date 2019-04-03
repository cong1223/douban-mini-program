<template>
	<view id="item-list">
		<view @click="skipMovieDetail(data.id)">
			<view class="grace-news-list-items">
				<image :src="data.images.large" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
				<view class="grace-news-list-title">
					<view class="grace-news-list-title-main">{{data.title}}</view>
					<view class="rating-star">
						<graceStar :score="data.rating.average" :value="5" :canTap="false"></graceStar>
					</view>
					<text class="grace-news-list-title-desc grace-text-overflow">{{data.year}} / {{data.countries}} / {{data.genres}} / {{data.casts}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import graceStar from '../graceUI/components/graceStar.vue';
export default {
	name: 'itemList',
	props: {
		data: {
			type: Object,
			default: function(){
				return {};
			}
		}
	},
	components: {
		graceStar,
	},
	data() {
		return {
			
		};
	},
	methods: {
		skipMovieDetail(movieId){
			uni.navigateTo({
				url: "../movie-detail/movie-detail?movieId=" + movieId
			})
		},
	},
};
</script>

<style lang="scss" scoped>
#item-list{
	padding: 0 20upx;
	.rating-star{
		height: 40upx;
		margin-top: 12upx;
		width: 50%;
	}
}
</style>
