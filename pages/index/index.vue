<template>
	<view class="wrapper">
		<view style="width:96%; padding:20upx 2%; background:#00C777; flex-wrap:nowrap;">
			<view class="search" @tap="skipSearch">
				<image src="../../static/images/sousuo.png"></image>
				<text class="flex-center">搜索</text>
			</view>
		</view>
		<view class="sort-list">
			<view class="hot-showing">
				<view
					class="grace-title grace-nowrap grace-space-between"
					style="margin-top:60upx;"
				>
					<view class="grace-h5 grace-blod">影院热映</view>
					<navigator class="grace-more-r">
						查看更多
						<text class="grace-iconfont icon-arrow-right"></text>
					</navigator>
				</view>
				<view>
                <scroll-view class="grace-scroll-x" scroll-x>
                    <view class="grace-items grace-items-demo1">1</view>
                    <view class="grace-items grace-items-demo2">2</view>
                    <view class="grace-items grace-items-demo1">3</view>
                    <view class="grace-items grace-items-demo2">4</view>
                    <view class="grace-items grace-items-demo1">5</view>
                </scroll-view>
            </view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onLoad() {
		uni.request({
			url: 'http://api.douban.com/v2/movie/in_theaters',
			method: 'GET',
			data: {},
			success: res => {
				console.log(res)
			},
			fail: () => {},
			complete: () => {}
		});
	},
	methods: {
		skipSearch() {
			uni.navigateTo({
				url: '../search/search'
			});
		}
	}
};
</script>

<style lang="less">
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
.hot-showing{
	
}
</style>
