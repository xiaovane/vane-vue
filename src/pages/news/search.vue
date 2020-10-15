<template>
	<el-container>
		<transition name="fade">
			<v-loading v-if="isLoading"></v-loading>
		</transition>
		<el-backtop :bottom="200" class="mini-hidden">UP</el-backtop>
		<el-main>
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
							</el-card>
						</el-col>
					</el-row>
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
				pageNum: 1,
				isContent: false,
				total: 1,
				channel: '',
				keyword: '',
				isLoading:true
			}
		},
		methods: {
			newList: function(flag) {
			    let that = this;
			    let params = {
			        'keyWord':that.$route.query.keys,
			        'channel': that.channel,
			        'pageNum': that.pageNum,
			        'pageSize': 10
			    };
			    api.news.search(params)
                    .then(response => {
						if (flag == 0 ) {
							that.list = response.data.data.list;
						} else {
							that.list = that.list.concat(response.data.data.list);
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
				this.loading = true
				setTimeout(() => {
					this.pageNum = this.pageNum + 1;
					this.newList(1);
					this.loading = false;
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
		}

	}
</script>

<style lang="scss">
	.text-overflow {
		display: block;
		width: 31em;
		height: 8em;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (min-width: 1024px) {
		.news-top{
			margin-top: 30px;
		}
	}
</style>