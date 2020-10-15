<template>
	<el-container>
		<transition name="fade">
			<v-loading v-if="isLoading"></v-loading>
		</transition>
		<el-backtop :bottom="200" class="mini-hidden">UP</el-backtop>
        <el-header>
            <!-- <el-menu
					:default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ff7562"
					>
                <el-menu-item
                        :index="(index+1+'')"
                        v-for="(item,index) in channels"
                        :key="index"
						v-on:click="refreshData(item.channel)">{{item.channel}}</el-menu-item>
            </el-menu> -->
			<div class="slide-box">
				<div
					v-for="(item,index) in channels"
					:key="index"
					:class="[channel==item.channel?'item-sel': '', 'slide-item']"
					@click="refreshData(item.channel)">{{item.channel}}</div>
			</div>
        </el-header>

		<el-main style="margin: 0px;padding: 0px 20px 0px 0px ">
			<ul class="list">
				<li v-for="(item, key) in list"
					:key="key"
					class="infinite-list-item news-top"
					style="list-style-type:none;margin-left: -20px">
					<el-row>
						<el-col>
							<el-card shadow="hover">
								<router-link :to="'/detail/'+item.id">
									<el-container>
										<el-header>
											<h3>{{item.title}}</h3>
										</el-header>
										<el-main v-html="item.context" style="overflow: hidden;max-height: 5em">
											{{item.context}}
										</el-main>
									</el-container>
								</router-link>
								<!--<el-link
										type="info"
										:href="'/#/detail/'+item.id+'?channel='+item.channel"
										:title="item.title">
									<el-container>
										<el-header>
											<h3>{{item.title}}</h3>
										</el-header>
										<el-main v-html="item.context" style="overflow: hidden;max-height: 5em">
											{{item.context}}
										</el-main>
									</el-container>
								</el-link>-->
							</el-card>
						</el-col>
					</el-row>
					<!--动态路由,将具体的值传过去-->
					<!--<router-link :to="'/detail/'+item.id"> {{item.title}}</router-link>-->
					<!--<el-image
                            style="width: 10%; height: 100px"
                            :src="item.coverPic"
                            :fit="fit"></el-image>-->
					<el-divider></el-divider>
				</li>
			</ul>
		</el-main>
		<el-footer style="text-align: center;margin-bottom: 50px">
			<p v-if="isContent">没有找到您要的内容哦，亲</p>
			<el-button
					v-else
					type="text"
					@click="loadMore">点击加载更多</el-button>
		</el-footer>

	</el-container>

</template>

<script>
    import api from "../../common/public/api";
    import vLoading  from "../../common/components/loading";
	export default {
		name: "index",
		components:{vLoading},
		data() {
			return {
				activeIndex: '1',
				channels: [],
				list: [],
				pageNum: 10,
				isContent: false,
				total: 1,
				channel: '头条',
				keyword: '',
				isLoading:true
			}
		},
		methods: {
			newList: function(flag) {
			    let that = this;
			    api.news.list(that.channel)
                    .then(response => {
						if (flag == 0) {
							that.list = response.data.data;
						} else {
							that.list = that.list.concat(response.data.data);
						}
                        that.total = response.data.data.total;
						that.isLoading=false;
						if(this.list.length==0){
							this.isContent=true;
						}
                    })

			},
			channelList: function () {
				let that = this;
				api.news.getChannelList()
						.then(response => {
							that.channels = response.data.data;
						})
			},
			loadMore: function () {
				setTimeout(() => {
					this.pageNum = this.pageNum + 1;
					this.newList(1);
				}, 1000)
			},
			refreshData: function(itemVal) {
			    this.channel = itemVal;
			    this.pageNum = 1;
			    this.keyword = '';
			    this.newList(0);
			}
		},
		mounted(){  //生命周期
			this.channelList();
			this.newList(0); // 调用方法
		},
	}
</script>

<style lang="scss">
	// .el-menu {
	// 	overflow-x: scroll;
    // 	display: -webkit-box;
	// }
	.slide-box{
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling:touch;
		background-color: #545c64;
		color: #fff;
		position: fixed;
		width: 100%;
		width: calc(100% - 40px);
		z-index: 1;
		top: 50px;
	}

	@media (min-width: 768px) {
		.slide-item{
			width: 60px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			margin-top: 10px;
			cursor:pointer;
		}
	}
	
	@media (max-width: 768px) {
		.slide-item{
			width: 60px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			cursor:pointer;
		}
	}
	.item-sel {
		color: #ff7562;
	}

	@media (min-width: 1024px) {
		.news-top{
           margin-top: 30px;
		}
	}
</style>