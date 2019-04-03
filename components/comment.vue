<template>
	<view class="grace-comment">
		<view class="title">
			<text class="notice">短评</text>
			<text class="more">查看全部</text>
		</view>
		<view class="grace-comment-list" v-for="item in data" :key="item.id">
			<view class="grace-comment-face"><image :src="item.author.avatar" mode="widthFix"></image></view>
			<view class="grace-comment-body">
				<view class="grace-comment-top">
					<text>{{item.author.name}}</text>
					<text class="grace-iconfont icon-zan"></text>
				</view>
				<view class="grace-comment-date">
					<text>{{item.created_at}}</text>
					<text>{{item.useful_count}}</text>
				</view>
				<view class="grace-comment-content">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'comment',
	props: {
		data: {
			type: Array,
			default: function(){
				return [];
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.grace-comment{
	background-color: #fff;
	border-radius: 10upx;
	margin-top: 50upx;
	.grace-comment-list{
		border-bottom: #ccc;
		padding: 20upx;
	}
	.title{
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		.notice{
			font-size: 32upx;
		}
		.more{
			font-size: 26upx;
			color: #ccc;
		}
	}
}
</style>
