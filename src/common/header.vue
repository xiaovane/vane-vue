<template>
    <div>
        <header class="mini-header">
            <div class="container">
                <h1 class="logo"><router-link to="/"><img src="../assets/images/video/logo.png"/></router-link></h1>
                <div class="sitenav" v-show="isShow">
                    <ul>
                        <li id="menu-item-18" class="menu-item">
                            <router-link to="/">首页</router-link>
                        </li>
                        <li id="menu-item-27" class="menu-item">
                            <router-link to="/live">直播</router-link>
                        </li>
                        <li id="menu-item-31" class="menu-item">
                            <router-link to="/video">视频</router-link>
                        </li>
                        <li id="menu-item-22" class="menu-item">
                            <router-link to="/membership">我的</router-link>
                        </li>
                    </ul>
                </div>
                <span class="sitenav-on" @click="toggleChange"><i class="icon-list"></i></span>
                <span class="sitenav-mask"></span>

                <div class="accounts">
                    <a class="account-weixin" href="javascript:;"><i class="fa">App</i>
                        <div class="account-popover"><div class="account-popover-content"></div></div>
                    </a>
                </div>
                <span class="notify" >{{notify}}</span>
                <span class="min-span"> <input tabindex="2" v-model="keys" @change="setKeyword" class="min-input" name="wd" type="text" placeholder="请输入关键字" value=""></span>
                <span class="searchstart-on"  ><i class="icon-search" @click="search"></i></span>
                <span class="searchstart-off"><i class="icon-search"></i></span>
                <div class="searchform">
                    <button tabindex="3" @click="search" class="sbtn" type="submit"><i class="fa"></i></button>
                    <!--<select class="sinput" style="width: 45px" v-on:change="selectItem($event)">
                        <option value="1">新闻</option>
                        <option value="2">视频</option>
                    </select>-->
                    <input tabindex="2" v-model="keys" @change="setKeyword" class="sinput" name="wd" type="text" placeholder="请输入关键字" value="">

                </div>
            </div>
        </header>
    </div>
</template>

<script>
import api from "./public/api";

export default{
    data(){
        return {
            keys: "",
            page:1,
            catalog:"1",
            notify:"",
            id:null,
            isShow:false
        }
    },
    methods: {
        search: function () {
            if (this.keys == "") {
                this.$message.warning("请输入关键字");
                return;
            }

            // let key="_"+this.keys;
            let   key=this.keys;
            let url="/news";
            if(this.$route.path.indexOf("video")>0||
                this.$route.path.indexOf("cartoon")>0||
                this.$route.path.indexOf("live")>0||
                this.$route.path.indexOf("movie")>0||
                this.$route.path.indexOf("tv")>0||
                this.$route.path.indexOf("show")>0||
                this.$route.path.indexOf("search")>0||
                this.$route.path.indexOf("player")>0){
                url="/search";
            }
            this.$router.push({
                path: url,
                query: {
                    // "keys": key,
                    // "page":this.page
                    "searchword":key,
                    "catalog":null,
                    "type":null,
                    "area":null,
                    "year":null,
                    "yuyan":null,
                    "page":null
                }
            });
        },
        selectItem:function(event){
            this.catalog=event.target.value
        },
        setKeyword: function () {
            this.$emit("transeferWord", this.keys);
        },
        toggleChange:function(){
            this.isShow=!this.isShow
        },
        getAdlst:function (position) {
            let params = new URLSearchParams();
            params.append('position', position);
            params.append('index', 1);
            params.append("size",10);
            params.append("random",false);
            api.adver.adList(params).then(response => {
                if(response.data.code=="200"){
                    this.notify=response.data.data.list[0].cover;
                    this.id=setInterval(this.run,800);
                }
            })
        },
        run: function () {
            let new_str = this.notify.substr(1,this.notify.length);
            let sub_str = this.notify.substr(0,1);
            this.notify = new_str + sub_str;
        }

    },
    mounted:function () {
        this.getAdlst("001")
    }
}
</script>

<style>
    .mini-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        background: #ffffff;
    }
</style>
