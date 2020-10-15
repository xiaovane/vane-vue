<template>
    <div style="text-align: center;">
        <div class="register-wrapper">
            <div id="register">
                <p class="title">我的资料</p>
                <el-form
                        :model="info"
                        status-icon
                        ref="info"
                        label-width="0"
                        class="ruleForm">
                    <el-form-item prop="picture" style="text-align: center;width: 150px;height: 100px">
                        <img src="../../assets/images/member/user.jpg" width="100" height="100" >
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input v-model="info.phone" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="nickName" class="nickName">
                        <el-input v-model="info.nickName" placeholder="昵称"></el-input>
                    </el-form-item>
                    <!--<el-form-item prop="sex" class="sex">
                        <el-input v-model="info.sex" placeholder="性别"></el-input>
                    </el-form-item>
                    <el-form-item prop="country" class="country">
                        <el-input v-model="info.country" placeholder="国家"></el-input>
                    </el-form-item>
                    <el-form-item prop="province" class="province">
                        <el-input v-model="info.province" placeholder="省份"></el-input>
                    </el-form-item>
                    <el-form-item prop="city" class="city">
                        <el-input v-model="info.city" placeholder="城市"></el-input>
                    </el-form-item>-->
                </el-form>
            </div>
        </div>
        <div class="ad-content">
            <ul>
                <p class="ad-remand">精选推荐</p>
                <li v-for="item in list">
                    <a :href="item.detail" target="_blank"><img :src="item.cover" width="260px" height="50px"></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import api from "../../common/public/api";
    export default {
        name: "detail",
        data(){
            return{
                info:{
                    phone:"",
                    picture:"../../assets/images/member/user.jpg",
                    nickName:"",
                    sex:"男",
                    country:"中国",
                    province:"",
                    city:""
                },
                list:{
                    adName:"",
                    cover:"",
                    linkType:"",
                    detail:""
                }
            }
        },
        computed:{

        },
        methods:{
            detail:function () {
                if(this.$route.query.id==null){
                    this.$message.error("当前用户信息不存在！")
                    this.$router.push({
                        path: '/membership'
                    });
                }
                api.membership.detail(this.$route.query.id).then(response => {
                    if(response.data.code=="200"){
                       this.info=response.data.data;
                    }else {
                        this.$message.error("当前用户信息不存在！")
                    }
                })
            },
            getAdlst:function (position) {
                let params = new URLSearchParams();
                params.append('position', position);
                params.append('index', 1);
                params.append("size",10);
                params.append("random",false);
                api.adver.adList(params).then(response => {
                    if(response.data.code=="200"){
                        this.list=response.data.data.list;
                    }
                })
            },
        },
        mounted() {
            this.detail();
            this.getAdlst("009");
        }
    }
</script>

<style scoped>
    .loading-wrapper {
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #aedff8;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .register-wrapper img {
        position: absolute;
        z-index: 1;
    }
    .register-wrapper {
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        text-align: center;
    }
    #register {
        max-width: 340px;
        margin: 0px auto;
        background: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        position: relative;
        z-index: 9;
    }
    .title {
        font-size: 26px;
        line-height: 50px;
        font-weight: bold;
        margin: 10px;
        text-align: center;
    }
    .el-form-item {
        text-align: center;
    }
    .login {
        margin-top: 10px;
        font-size: 14px;
        line-height: 22px;
        color: #1ab2ff;
        cursor: pointer;
        text-align: left;
        text-indent: 8px;
        width: 160px;
    }
    .login:hover {
        color: #2c2fd6;
    }
    .code >>> .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .code button {
        margin-left: 20px;
        width: 140px;
        text-align: center;
    }
    .el-button--primary:focus {
        background: #409EFF;
        border-color: #409EFF;
        color: #fff;
    }
    .ad-content {
      text-align: center;
      margin-bottom: 80px;
    }
    .ad-content li{
        display: block;
        list-style: none;
        margin:10px 5px 0 -36px;
    }
    .ad-remand {
        font-size: 14px;
        line-height: 14px;
        font-weight: bold;
        margin:10px 5px;
        text-align: center;
    }
</style>