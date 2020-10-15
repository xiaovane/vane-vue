<template>
    <div>
       <!-- <div id="homeso">
            <img id="imgsrc" src="../../assets/images/video/sologo.png"><br>
            <input tabindex="2" class="homesoin" id="sos" v-model="keys" name="wd" type="text"
                   placeholder="输入你要观看的视频" value="">
            <button tabindex="3" @click="search" class="homesobtn" type="submit"><i class="fa">观看</i></button>
        </div>-->

        <el-row class="warp" >
            <el-col :span="12" class="warp-breadcrum" style="width: 100%" >
                <el-carousel :interval="4000" type="card" >
                    <el-carousel-item v-for="(item, key) in ads" :key="key">
                        <a :href="item.detail" target="_blank" :title="item.adName">
                            <img :src="item.cover" class="image">
                            <h4 class="small">{{item.adName}}</h4>
                        </a>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <section class="container">
            <div class="single-strong">电视剧<span class="chak"><router-link to="/tv">more></router-link></span></div>
            <div class="b-listtab-main">
                <div class="s-tab-main">

                    <div class='item' v-for="(item, key) in tv" :key="key">
                        <a class='js-tongjic' @click="player(item.url)" target='_blank'>
                            <div class='cover g-playicon' :title="item.title">
                                <img :src="item.image"/>
                                <span class='pay'>{{item.grade}}</span>
                                <span class='hint'>{{item.tag}}</span>
                            </div>
                            <div class='detail'>
                                <p class='title g-clear'>
                                    <span class='s1' style="width: 164px;" :title="item.title">{{item.title}}</span>
                                </p>
                            </div>
                        </a></div>
                </div>
            </div>

            <div class="single-strong">电影<span class="chak"><router-link to="/movie">more></router-link></span>
            </div>
            <div class="b-listtab-main">
                <div class="s-tab-main">
                    <div class='item' v-for="(item, key) in video" :key="key">
                        <a class='js-tongjic' @click="player(item.url)" target='_blank'>
                            <div class='cover g-playicon' :title="item.title">
                                <img :src="item.image"/>
                                <span class='pay'>{{item.grade}}</span>
                                <span class='hint'>{{item.tag}}</span>
                            </div>
                            <div class='detail'>
                                <p class='title g-clear'>
                                    <span class='s1' style="width: 164px;" :title="item.title">{{item.title}}</span>
                                </p>
                            </div>
                        </a></div>
                </div>
            </div>

            <div class="single-strong">动漫*综艺<span class="chak"><router-link to="/cartoon">more></router-link></span>
            </div>
            <div class="b-listtab-main">
                <div class="s-tab-main">
                    <div class='item' v-for="(item, key) in cartoon" :key="key">
                        <a class='js-tongjic' @click="player(item.url)" target='_blank'>
                            <div class='cover g-playicon' :title="item.title">
                                <img :src="item.image"/>
                                <span class='pay'>{{item.grade}}</span>
                                <span class='hint'>{{item.tag}}</span>
                            </div>
                            <div class='detail'>
                                <p class='title g-clear'>
                                    <span class='s1' style="width: 164px;" :title="item.title">{{item.title}}</span>
                                </p>
                            </div>
                        </a></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import api from "../../../common/public/api";

    export default {
        name: "index",
        data() {
            return {
                video: [],
                tv: [],
                cartoon: [],
                keys:"",
                page:1,
                ads:{
                    adName:"",
                    cover:"",
                    linkType:"",
                    detail:""
                }
            }
        },
        methods: {
            index: function () {
               let that = this;
                api.video.getIndex()
                    .then(response => {
                        that.video = response.data.data.movie;
                        that.tv = response.data.data.tv;
                        that.cartoon = response.data.data.cartoon;
                    })
            },
            player: function (url) {
                this.$router.push({
                    path: '/player',
                    query: {
                        "url": url
                    }
                });
            },
            search: function () {
                if (this.keys == "") {
                    this.$message.warning("请输入关键字");
                    return;
                }
                this.$router.push({
                    path: "/search",
                    query: {
                        "keys":"_"+this.keys,
                        "page":this.page
                    }
                });
            },
            getAdlst:function (position) {
                let params = new URLSearchParams();
                params.append('position', position);
                params.append('index', 1);
                params.append("size",10);
                params.append("random",false);
                api.adver.adList(params).then(response => {
                    if(response.data.code=="200"){
                        this.ads=response.data.data.list;
                    }
                })
            },
        },
        mounted: function () {
            this.index();
            this.getAdlst("007");
        }
    }
</script>

<style>
    @import '../../../assets/css/video/style.css';
    @import '../../../assets/css/video/cartoon.css';
</style>
