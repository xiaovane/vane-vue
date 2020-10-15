<template>
    <div>
        <transition name="fade">
            <v-loading v-if="isLoading"></v-loading>
        </transition>
        <div class="single-post" >
            <section class="container">
                <div class="content-wrap">
                    <div class="content" style="margin-right: unset;">
                        <div class="info-left">
                            <img :src="video.image" :title="video.title" @error="imgError(video)">
                        </div>
                        <div class="info-left">
                            <div class="sptitle">
                                <h1>{{video.title}}</h1>
                            </div>
                            <div class="item-desc">
                                <div class="item-detail">
                                    <p><span>导演:</span>{{video.director}}</p>
                                    <p><span>主演:</span>{{video.actor}}</p>
                                    <p><span>类型:</span>{{video.type}}</p>
                                    <p><span>地区:</span>{{video.area}}</p>
                                    <p><span>年份:</span> {{video.time}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="clean">
                            <h3 class="single-strong">简介</h3>
                            <p class="item-desc js-close-wrap">&#12288;&#12288;{{video.introduction}}</p>
                        </div>
                        <div></div>
                        <div id="bof"></div>
                        <div class="am-cf"></div>
                        <div v-if="isContent" class="content">内容丢失了，亲!!!</div>
                        <div class="am-panel am-panel-default">
                            <div class="am-panel-bd">
                                <div class="bofangdiv">
                                    <img id="addid" src="../../../assets/images/video/1280jiazai.png" style="display: none;width:100%;border: 2px solid #ff6651">
                                    <iframe :src="url" width="100%" height="500" allowTransparency="true" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" allowfullscreen="true"></iframe>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="xuji">
                                    <span>当前正在播放：</span>
                                    <span>{{video.title}}-{{play}}</span>
                                </div>
                                <div class="video-list view-font">
                                    <div class="dianshijua" id="dianshijuid">
                                        <h3 class="single-strong"><font color="#ff6651">播放源</font></h3>
                                        <div class="top-list-ji" id="sources">
                                            <div class="on" id="source">
                                                <a @click="click(index)" href="javascript:void(0);" v-for="(item,index) in video.sources" class="am-btn am-btn-default lipbtn" :class="{ 'visited': visited(index)}">{{index}}</a>
                                            </div>
                                            <div  v-for="(items,index) in video.sources" :class="{'on': change(index)}">
                                                <a v-for="item in items" href="javascript:void(0);" class="am-btn am-btn-default lipbtn"
                                                   @click="player(item.url,item.play)" :class="{ 'visited': visited(item.play)}">{{item.play}}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>

                                <div style="clear: both;"></div>
                                <h3 class="single-strong">猜你喜欢</h3>
                                <ul class="cainixihuan">
                                    <li v-for="item in video.like" :title="item.title"  class='w-newfigure w-newfigure-180x287'>
                                        <a class='js-link' @click="playDetail(item.url)" :title='item.title' target='_blank'>
                                            <div class='w-newfigure-imglink g-playicon js-playicon'>
                                                <img :src="item.image" :alt='item.title' @error="imgError(item)"/>
                                            </div>
                                            <div class='w-newfigure-detail'>
                                                <p class='title g-clear'>
                                                    <span class='s1'>{{item.title}}</span>
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div style="clear: both;"></div>
                            </div>
                        </div>
                        <div class="article-actions clearfix">
                            <div class="shares">
                                <strong>分享到：</strong>
                                <div class="bdsharebuttonbox bdshare-button-style0-16">
                                    <a href="#" class="bds_more" data-cmd="more"></a>
                                    <a href="#" class="bds_qzone" data-cmd="qzone"></a>
                                    <a href="#" class="bds_tsina" data-cmd="tsina"></a>
                                    <a href="#" class="bds_tqq" data-cmd="tqq"></a>
                                    <a href="#" class="bds_renren" data-cmd="renren"></a>
                                    <a href="#" class="bds_weixin" data-cmd="weixin"></a>
                                </div>

                            </div>
                            <a href="javascript:" class="action-rewards" etap="rewards">打赏</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import api from "../../../common/public/api";
    import base from "../../../common/public/baseurl";
    import tags from "../../../../../cms/src/common/tags";
    import vLoading  from "../../../common/components/loading";
    export default {
        name: "play",
        components:{vLoading},
        data() {
            return {
                video: [],
                source:"播放源1",
                url:"",
                play:"第01集",
                isLoading:true,
                isContent: false,
                isLoaded:false
            }
        },
        beforeCreate(){
            const _this=this;
            setTimeout(()=>{
                _this.setup()
            },0);

        },
        watch: {
            '$route'(to,from) {
                this.detail();
            },
        },
        methods: {
            detail: function() {
                let that = this;
                api.video.detail(that.$route.query.url)
                    .then(response => {
                       if(response.data.code=="200"){
                           let data=response.data.data;
                           that.video=data;
                           this.url=data.firstUrl;
                           that.isLoaded=true;
                       }else{
                           this.isContent=true;
                       }
                        that.isLoading=false;
                    })
            },

            click: function (data) {
               this.source=data;
            },

            change: function (data) {
                if(this.source==data){
                    return true;
                }
                return  false;
            },

            player: function (url,play) {
                this.url=url;
                this.play=play
            },
            playDetail: function (url) {
                this.$router.push({
                    path: '/player',
                    query: {
                        "url": url
                    }
                });
            },
            visited: function (data) {
                if(this.source==data){
                    return true;
                }
                if(this.play==data){
                    return true;
                }
                return  false;
            },
            getPlayUrl:function(){
                const dp = new DPlayer({
                    container: document.getElementById('dplayer'),
                    screenshot: false,
                    lang: 'zh-cn',
                    //logo: 'tx.png',
                    hotkey: true,
                    volume: 0.8,
                    theme: '#c10000',
                    preload: 'auto',
                    autoplay: false,
                    video: {
                        url: this.url,
                        type: 'auto',
                        //pic: '/t/p.svg',
                        //thumbnails: '',
                    },
                });
            },
            imgError(item) {
                item.image = require('../../../assets/images/video/default-img.jpg');
            },
            setup(){
                window._bd_share_config={
                    "common":{
                        "bdSnsKey":{},
                        "bdText":"",
                        "bdMini":"2",
                        "bdPic":"",
                        "bdStyle":"0",
                        "bdSize":"16"
                    },
                    "share":{},
                    "image":{
                        "viewList":["qzone","tsina","tqq","renren","weixin"],
                        "viewText":"分享到：","viewSize":"16"
                    },
                    "selectShare":{
                        "bdContainerClass":null,
                        "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
                    }
                };
                this.createElement('http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5),'script','text/javascript');
            },
            createElement:function (url,tagName,type) {
                const s = document.createElement(tagName);
                s.type =type ;
                s.src = url;
                document.body.appendChild(s);
            }

        },
        mounted: function () {
            this.detail();
            //this.getPlayUrl();
        }
    }


</script>

<style scoped>
    @import '../../../assets/css/video/style.css';
    @import '../../../assets/css/video/play.css';
</style>