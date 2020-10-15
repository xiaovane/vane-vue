<template>
    <div id="cartoon">
        <section class="container">
            <div class="filter">
                <a href='javascript:void(0);' v-for="item in filter.全部分类"  @click="filter_click1(item)"
                   target='_self' :class="{'red': change(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="filter">
                <a href='javascript:void(0);' v-for="item in filter.全部类型"  @click="filter_click4(item)"
                   target='_self' :class="{'red': change(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="filter">
                <a href='javascript:void(0);' v-for="item in filter.全部地区"  @click="filter_click2(item)"
                   target='_self' :class="{'red': change(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="filter">
                <a href='javascript:void(0);' v-for="item in filter.全部年代"  @click="filter_click3(item)"
                   target='_self' :class="{'red': change(item)}" :title='item'>{{item}}</a>
            </div>
            <div class="m-g">
                <div class="b-listtab-main">
                    <div class="s-tab-main">
                        <div class='item' v-for="item in list">
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
            </div>
            <div class="paging" id="page1">
                <div v-for="item in foot.pages">
                    <a @click="click(item)" :class="{ 'red': change(item)}">{{item}}</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import api from "../../../common/public/api";
    export default {
        name: "tv",
        data() {
            return {
                filter:[],
                list: [],
                foot:[],
                page:2,
                catag:"连续剧",
                direct:"3",
                area:"",
                time:"",
                type:""
            }
        },

        methods: {
            search: function (data) {
                let that=this;
                let params=data==null?{
                    "keys":this.direct+"_"+this.type+"_"+this.area+"_"+this.time,
                    "page":this.page
                }:data;
                api.video.searchList(params)
                    .then(function (response) {
                        that.filter = response.data.data.filter;
                        that.list = response.data.data.list;
                        that.foot = response.data.data.foot;
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
                    "keys":this.direct+"_"+this.type+"_"+this.area+"_"+this.time,
                    "page":this.page
                };
                this.search(params)
            },

            filter_click1: function (data) {
                switch (data) {
                    case "全部分类":
                        this.direct="all";
                        break;
                    case "电影":
                        this.direct=1;
                        break;
                    case "连续剧":
                        this.direct=2;
                        break;
                    case "动漫":
                        this.direct=3;
                        break;
                    case "综艺":
                        this.direct=4;
                        break;
                }
                this.catag=data;
                let params={
                    "keys":this.direct+"_"+this.type+"_"+this.area+"_"+this.time,
                    "page":1
                };
                this.search(params)
            },

            filter_click2: function (data) {
                this.area=data!="全部地区"?data:"";
                let params={
                    "keys":this.direct+"_"+this.type+"_"+this.area+"_"+this.time,
                    "page":1
                };
                this.search(params)
            },

            filter_click3: function (data) {
                this.time=data!="全部年代"?data:"";
                let params={
                    "keys":this.direct+"_"+this.type+"_"+this.area+"_"+this.time,
                    "page":1
                };
                this.search(params)
            },

            filter_click4: function (data) {
                this.type=data!="全部类型"?data:"";
                let params={
                    "keys":this.direct+"_"+this.type+"_"+this.area+"_"+this.time,
                    "page":1
                };
                this.search(params)
            },

            change: function (data) {
                if(this.page==data){
                    return true;
                }
                if(this.catag==data||(data=="全部分类"&&this.direct=="all")){
                    return true;
                }
                if(this.area==data||(data=="全部地区"&&this.area=="")){
                    return true;
                }
                if(this.time==data||(data=="全部年代"&&this.time=="")){
                    return true;
                }
                if(this.type==data||(data=="全部类型"&&this.type=="")){
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