<template>
    <div id="fixed-ad" :class="{'is-show':isShow()}">
        <a @click="close()" href="javascript:void(0);">关闭</a>
        <el-row class="warp" >
            <el-col :span="12" class="warp-breadcrum" >
                <el-carousel :interval="4000"  >
                    <el-carousel-item v-for="(item, key) in ads" :key="key">
                        <a :href="item.detail" target="_blank" :title="item.adName">
                            <img :src="item.cover" class="image">
                            <h4 class="small">{{item.adName}}</h4>
                        </a>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import api from "../public/api";

    export default {
        name: "fixed-ad",
        data(){
            return{
                ads:{
                    adName:"",
                    cover:"",
                    linkType:"",
                    detail:"",
                    hidden:false
                }
            }
        },
        methods:{
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

            close:function () {
                this.ads.hidden=true;
            },

            isShow:function () {
               return this.ads.hidden;
            }
        },
        mounted:function () {
            this.getAdlst("002")
        }
    }
</script>

<style scoped>
    #fixed-ad{
        height: 300px;
        width: 300px;
        position: fixed;
        float: right;
        right: 0;
        bottom: 50px;
    }

    .is-show{
        display: none;
    }
</style>