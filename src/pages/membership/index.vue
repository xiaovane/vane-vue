<template>
    <div>
        <div class="register-wrapper">
            <div id="register">
                <p class="title">用户中心</p>
                <el-form
                        :model="info"
                        status-icon
                        :rules="rules"
                        ref="info"
                        label-width="0"
                        class="ruleForm">
                    <el-form-item prop="phone">
                        <el-input v-model="info.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="code" class="code">
                        <el-input v-model="info.code" placeholder="获取验证码"></el-input>
                        <el-button type="primary" :disabled='isDisabled' v-on:click="getCode(info.phone)">{{buttonText}}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="login()" :disabled="disable" style="width:100%;">确定</el-button>
                    </el-form-item>
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
        name: "index",
        data(){
            let checkTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'))
                } else if (!this.checkMobile(value)) {
                    callback(new Error('手机号码不合法'))
                } else {
                    callback()
                }
            };

            let checkCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机验证码'))
                } else {
                    callback()
                }
            };
            return{
                info:{
                    phone:"",
                    code:"",
                    radio:0
                 },
                list:{
                    adName:"",
                    cover:"",
                    linkType:"",
                    detail:""
                },
                rules: {
                    phone: [{ validator: checkTel, trigger: 'change' }],
                    code: [{ validator: checkCode, trigger: 'change' }],
                },
                buttonText: '获取验证码',
                isDisabled: false,
                disable:true,
                flag: true
            }
        },
        computed:{

        },
        methods:{
           getCode:function (phone) {
               if (this.checkMobile(phone)) {
                   let time = 600
                   this.buttonText = '已发送'
                   this.isDisabled = true
                   this.disable=false
                   if (this.flag) {
                       this.flag = false;
                       let timer = setInterval(() => {
                           time--;
                           this.buttonText = time + ' 秒'
                           if (time === 0) {
                               clearInterval(timer);
                               this.buttonText = '重新获取'
                               this.isDisabled = false
                               this.flag = true;
                               this.disable=true
                           }
                       }, 1000)
                   }
                   let params = new URLSearchParams();
                   params.append('phone', this.info.phone);
                   api.membership.message(params).then(response => {
                       console.log(response.data.code)
                   })
               }
               else {
                   this.$message.error('手机号码不合法');
               }
           },
           check:function (info) {
               api.membership.messageChcek(info.phone,info.code).then(response => {
                   console.log(response.data.code)
               })
           },
           login:function () {
               if (this.checkMobile(this.info.phone)) {
               let params = new URLSearchParams();
               params.append('phone', this.info.phone);
               params.append('code', this.info.code);
               params.append("isPwd",false);
               api.membership.login(params).then(response => {
                   if(response.data.code=="200"){
                       sessionStorage.setItem("userId",response.data.data.id);
                       this.$router.push({
                           path: '/member',
                           query: {
                               "id": response.data.data.id
                           }
                       });
                   }else {
                       this.$message.error('操作失败，请重新尝试');
                   }
               })
               }else {
                   this.$message.error("手机号码不合法")
               }
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
            checkMobile(str) {
                let re = /^1\d{10}$/
                if (re.test(str)) {
                    return true;
                } else {
                    return false;
                }
            },
            checkLoginStatus(){
               if(sessionStorage.getItem("userId")!=null){
                   this.$router.push({
                       path: '/member',
                       query: {
                           "id": sessionStorage.getItem("userId")
                       }
                   });
               }
            }
        },
        mounted() {
            this.getAdlst("008");
            this.checkLoginStatus();
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
    }
    #register {
        max-width: 340px;
        margin: 60px auto;
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