<template>
    <div id="right-sider-ad" :class="{'is-show':isShow()}">
        <a @click="close()" href="javascript:void(0);">关闭</a>
        <el-row class="warp" >
            <el-col :span="12" class="warp-breadcrum" >
                <el-item v-for="(item, key) in ads" :key="key">
                    <a :href="item.detail" target="_blank" :title="item.adName">
                        <img :src="item.cover" class="image">
                        <h4 class="small">{{item.adName}}</h4>
                    </a>
                </el-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import api from "../public/api";

    export default {
        name: "right-sider-ad",
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
            this.getAdlst("005")
        }
    }
</script>

<style scoped>
    #right-sider-ad{
        height: 100px;
        width: 100px;
        position: fixed;
        float: right;
        right: 0;
        top: 10px;
    }

    .is-show{
        display: none;
    }
</style>