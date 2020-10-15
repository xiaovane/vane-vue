<template>
    <div id="cartoon">
        <transition name="fade">
            <v-loading v-if="isLoading"></v-loading>
        </transition>
        <section class="container">
            <div class="filter">
                <a class="font-bold">按分类</a>
                <a href='javascript:void(0);' v-for="item in filter.按分类"  @click="filter_click1(item)"
                   target='_self' :class="{'red': change2(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="filter">
                <a class="font-bold">按标签</a>
                <a href='javascript:void(0);' v-for="item in filter.按标签"  @click="filter_click2(item)"
                   target='_self' :class="{'red': change5(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="filter">
                <a class="font-bold">按地区</a>
                <a href='javascript:void(0);' v-for="item in filter.按地区"  @click="filter_click3(item)"
                   target='_self' :class="{'red': change3(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="filter">
                <a class="font-bold">按年代</a>
                <a href='javascript:void(0);' v-for="item in filter.按年代"  @click="filter_click4(item)"
                   target='_self' :class="{'red': change4(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="filter">
                <a class="font-bold">按语言</a>
                <a href='javascript:void(0);' v-for="item in filter.按语言"  @click="filter_click5(item)"
                   target='_self' :class="{'red': change6(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="m-g">
                <div class="b-listtab-main">
                    <div class="s-tab-main">
                        <div class='item' v-for="item in list">
                            <a class='js-tongjic' @click="player(item.url)" target='_blank'>
                                <div class='cover g-playicon' :title="item.title">
                                    <img :src="item.image" @error="imgError(item)"/>
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
            </div>
            <div class="paging" id="page1">
                <div v-for="item in foot.pages">
                    <a @click="click(item)" :class="{ 'red': change1(item)}">{{item}}</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import api from "../../../common/public/api";
    import vLoading  from "../../../common/components/loading";
    export default {
        name: "cartoon",
        components:{vLoading},
        data() {
            return {
                filter:[],
                list: [],
                foot:[],
                page:1,
                catag:"",
                direct:"",
                area:"",
                time:"",
                type:"",
                yuyan:"",
                keys:"",
                isLoading:true,
                isContent: false
            }
        },

        methods: {
            search: function (data) {
                let that=this;
                this.keys=that.$route.query.searchword;
                let params=data!=null?{
                    "searchword":this.keys,
                    "catalog":this.catalog,
                    "type":this.type,
                    "area":this.area,
                    "year":this.time,
                    "yuyan":this.yuyan,
                    "page":this.page
                }:that.$route.query;
                api.video.searchList(params)
                    .then(function (response) {
                        that.filter = response.data.data.filter;
                        that.list = response.data.data.list;
                        that.foot = response.data.data.foot;
                        that.isLoading=false;
                        if(this.list.length===0){
                            this.isContent=true;
                        }
                    })
            },

            click: function (data) {
                if (data=="首页"){
                    this.page=1;
                }else if(data=="下一页"){
                    this.page+=1;
                }else if(data=="上一页"){
                    this.page-=1;
                }else if(data=="尾页"){
                    this.page=this.foot.num;
                }else {
                    this.page=data;
                }
                let params={
                    "searchword":this.keys,
                    "catalog":this.catalog,
                    "type":this.type,
                    "area":this.area,
                    "year":this.time,
                    "yuyan":this.yuyan,
                    "page":this.page
                };
                this.search(params)
            },

            filter_click1: function (data) {
                let url="";
                switch (data) {
                    case "电影":
                        url="/movie";
                        break;
                    case "电视剧":
                        url="/tv";
                        break;
                    case "动漫":
                        url="/cartoon";
                        break;
                    case "综艺":
                        url="/show";
                        break;
                }
                this.$router.push({
                    path: url
                });
            },
            filter_click2: function (data) {
                this.type=data=="全部"?"":data;
                this.search(null)
            },
            filter_click3: function (data) {
                this.area=data=="全部"?"":data;
                this.search(null)
            },
            filter_click4: function (data) {
                this.time=data=="全部"?"":data;
                this.search(null)
            },
            filter_click5: function (data) {
                this.yuyan=data=="全部"?"":data;
                this.search(null)
            },
            change1: function (data) {
                if(this.page==data){
                    return true;
                }
                return  false;
            },
            change2: function (data) {
                if(this.catag==data||(data=="全部"&&this.catag=="")){
                    return true;
                }
                return  false;
            },
            change3: function (data) {
                if(this.area==data||(data=="全部"&&this.area=="")){
                    return true;
                }
                return  false;
            },
            change4: function (data) {
                if(this.time==data||(data=="全部"&&this.time=="")){
                    return true;
                }
                return  false;
            },
            change5: function (data) {
                if(this.type==data||(data=="全部"&&this.type=="")){
                    return true;
                }
                return  false;
            },
            change6: function (data) {
                if(this.yuyan==data||(data=="全部"&&this.yuyan=="")){
                    return true;
                }
                return  false;
            },

            player: function (url) {
                this.$router.push({
                    path: '/player',
                    query: {
                        "url": url
                    }
                });
            },
            imgError(item) {
                item.image = require('../../../assets/images/video/default-img.jpg');
            }
        },

        mounted: function () {
            this.search();
        }
    }
</script>

<style>
    @import '../../../assets/css/video/style.css';
    @import '../../../assets/css/video/cartoon.css';
    @import '../../../assets/css/video/common.css';
</style>