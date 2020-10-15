<template>

	<el-container>
	    <!--<el-aside width="300px">
            <h1 style="text-align: center">{{channel}}</h1>
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="item in newsLst" class="infinite-list-item">{{ item.title }}</li>
            </ul>
        </el-aside>-->
        <el-page-header @back="goBack" ></el-page-header>
        <transition name="fade">
            <v-loading v-if="isLoading"></v-loading>
        </transition>
        <el-header v-bind:class="{head: true}" style="height: auto;">
            <h1 v-html="news.title">{{news.title}}</h1>
        </el-header>
        <el-main
                v-html="news.context"
                v-bind:class="{detail: true}">
            <div >
                {{news.context}}
            </div>
        </el-main>
        <div v-if="isContent" class="content">内容丢失了，亲!!!</div>
        <el-footer>
            <el-divider>到底了,没有了，亲</el-divider>
        </el-footer>
        <el-backtop :bottom="300" class="mini-hidden">top</el-backtop>
	</el-container>

</template>

<script>
    import api from "../../common/public/api";
    import vLoading  from "../../common/components/loading";
	export default {
	    name: "detail",
        components:{vLoading},
		data() {
			return {
				msg: 'my detail!',
				news: [],
                newsLst: [],
                channel: '',
                isLoading:true,
                isContent:false
			}
		},
		mounted() {
           //生命周期
			//			 console.log(this.$route.params);    //获取动态路由传值
			//获得新闻编号
			let aid = this.$route.params.id;
			this.channel = this.$route.params.channel;
			//调用请求的数据
			this.detail(aid);
            this.leftList(this.channel);
		},
		methods: {
			detail: function(id) {
                let that = this;
                api.news.detail(id)
                    .then(response => {
                        that.news = response.data.data;
                        that.isLoading=false;
                        if(this.news.length==0){
                            this.isContent=true;
                        }
                    })
            },
            leftList: function (channel) {
                let that = this;
                let params = {
                    'channel': channel,
                    'pageNum': 1,
                    'pageSize': 10
                };
                api.news.list(channel)
                    .then(response => {
                        that.newsLst = response.data.data.list;
                    })
            },
            goBack: function() {
                this.$router.go(-1);
            }
		}
	}
</script>

<style lang="scss">
    .head {
        font-size: 20px;
        text-align: center;
    }
	/*详情样式*/
    .detail{
        line-height: 2;
        padding: 10px;
        width: 70%;
        align-self: center;
    }

   /* img{
        max-width: 80%;
        max-height: 80%;
    }*/

    figure {
        text-align: center;
    }


</style>