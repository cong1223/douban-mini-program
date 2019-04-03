<template>
	<view id="movie-detail">
		<!-- 自定义导航栏 -->
		<cmd-nav-bar 
			:fixed="true" 
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
					<view class="rating-wrap" v-for="item in average" :key="item">
						<text class="score">{{rating}}</text>
						<graceStar :score-view="false" :value="item" :canTap="false"></graceStar>
					</view>
					<view class="rating-count" >
						<view class="counting-item">
							<view class="item-list">
								<image v-for="item in 5" :key="item" src="../../static/images/star_0.png" mode="widthFix" style="width: 15upx;height: 15upx;"></image>
								<view class="progress">
									<view class="cover" :style="{width: value[0]+'%'}"></view>
								</view>
							</view>
							<view class="item-list">
								<image v-for="item in 4" :key="item" src="../../static/images/star_0.png" mode="widthFix" style="width: 15upx;height: 15upx;"></image>
								<view class="progress">
									<view class="cover" :style="{width: value[1]+'%'}"></view>
								</view>
							</view>
							<view class="item-list">
								<image v-for="item in 3" :key="item" src="../../static/images/star_0.png" mode="widthFix" style="width: 15upx;height: 15upx;"></image>
								<view class="progress">
									<view class="cover" :style="{width: value[2]+'%'}"></view>
								</view>
							</view>
							<view class="item-list">
								<image v-for="item in 2" :key="item" src="../../static/images/star_0.png" mode="widthFix" style="width: 15upx;height: 15upx;"></image>
								<view class="progress">
									<view class="cover" :style="{width: value[3]+'%'}"></view>
								</view>
							</view>
							<view class="item-list">
								<image v-for="item in 1" :key="item" src="../../static/images/star_0.png" mode="widthFix" style="width: 15upx;height: 15upx;"></image>
								<view class="progress">
									<view class="cover" :style="{width: value[4]+'%'}"></view>
								</view>
							</view>
							<view class="counting-persons">
								<text>1231231人评分</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="summary">
				<view class="title">
					简介
				</view>
				<view class="content" :style="{'-webkit-line-clamp': toggleTextStatus ? 10 : textRow}">
					{{summary}}
				</view>
				<view class="toggle-text-btn" @click="onToggleText">{{toggleInnerText}}</view>
			</view>
			<view class="actor">
				<movie-item :movieData="actors" sort="影人" mode="actor" :more="false"></movie-item>
			</view>
			<view class="photos">
				<view class="title">
					剧照
				</view>
				<scroll-view class="grace-scroll-x" scroll-x>
                    <view v-for="item in photos" :key="item" class="grace-items grace-items-demo1">
						<image :src="item" mode="widthFix"></image>
					</view>
                </scroll-view>
			</view>
			<view class="notice">
				<comment :data="notice"></comment>
			</view>
		</view>
	</view>
</template>
<script>
import graceStar from '../../graceUI/components/graceStar.vue';
import movieItem from '../../components/movie-item.vue';
import comment from '../../components/comment.vue';
export default {
	components: {
		graceStar,
		movieItem,
		comment
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
			average: [],
			value: [20,50,30,70,90],
			summary: '',
			toggleTextStatus: false,
			textRow: 4,
			toggleInnerText: '展开',
			actors: [],
			photos: [],
			notice: [],
		}
	},
	onLoad(option) {
		uni.request({
			url: 'https://douban.uieee.com/v2/movie/subject/' + option.movieId,
			method: 'GET',
			header:{
				"Content-Type":"json"
			},
			success: res => {
				console.log(res.data)
				this.title = res.data.title;
				res.data.countries.map((item)=>{
					this.$trim(this.countries += item + ' ');
				});
				res.data.genres.map((item)=>{
					this.$trim(this.genres += item + ' ');
				})
				this.durations = res.data.durations[0];
				this.pubdates = res.data.pubdates[0];
				this.imgUrl = res.data.images.large;
				this.year = res.data.year;
				this.rating = res.data.rating.average;
				this.average.push(Number(this.$ratingStar(res.data.rating.average)));
				this.summary = res.data.summary;
				this.actors = res.data.casts;
				this.actors.map((item)=>{
					item.role = '演员'
				});
				res.data.directors.map((item)=>{
					item.role = '导演';
					this.actors.unshift(item);
				});
				res.data.photos.map((item)=>{
					this.photos.push(item.image);
				});
				this.notice = res.data.popular_comments;
			},
			fail: (error) => {
				console.log(error);
			},
		});
	},
	methods:{
		onToggleText(){
			this.toggleInnerText = this.toggleInnerText == '展开' ? '收起' : '展开';
			this.toggleTextStatus = this.toggleTextStatus === true ? false : true;
		}
	}
}
</script>
<style lang="scss">
	.iconfont{
		width: 50upx;
		height: 50upx;
	}
	#movie-detail{
		.wrapper{
			margin-top: 145upx;
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
						font-size: 32upx;
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
				border-radius: 10upx;
				padding: 0 25upx;
				margin-top: 35upx;
				.title{
					display: flex;
					justify-content: space-between;
					padding: 15upx;
				}
				.content{
					padding: 40upx;
					display: flex;
					justify-content: center;
					align-items: center;
					.rating-wrap{
						text-align: center;
						width: 30%;
						.score{
							font-size: 34upx;
							font-weight: bold;
							margin-bottom: 20upx;
						}
					}
					.rating-count{
						display: flex;
						margin-left: 30upx;
						.counting-item{
							display: flex;
							flex-direction: column;
							.item-list{
								display: flex;
								justify-content: flex-end;
								.progress{
									position: relative;
									background-color: lightgray;
									height: 10upx;
									width: 130upx;
									margin: 5upx 0 0 10upx;
									.cover{
										position: absolute;
										left: 0;
										top: 0;
										height: 100%;
										width: 20%;
										background-color: #00C777;
									}
								}
							}
							.counting-persons{
								font-size: 16upx;
								color: darkgray;
								display: flex;
								justify-content: flex-end;
							}
						}
					}
				}
			}
			.summary{
				.title{
					text-align: left;
					font-size: 28upx;
					font-weight: bold;
					padding: 50upx 0 20upx 0;
				}
				.content{
					font-size: 26upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.toggle-text-btn{
					width: 100%;
					text-align: right;
					font-size: 28upx;
					color: #ccc;
				}
			}
			.actor{
				padding: 50upx 0;
			}
			.photos{
				.title{
					text-align: left;
					font-size: 28upx;
					font-weight: bold;
					padding: 20upx 0;
				}
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>