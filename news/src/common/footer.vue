<template>
    <div>
        <div class="foornav">
            <router-link to="/"><span><i class="iconfont ali-icon-systemshouye"></i><br>首页</span></router-link>
            <router-link to="/live"><span><i class="iconfont ali-icon-systemzhibo"></i><br>直播</span></router-link>
            <router-link to="/video"><span><i class="iconfont ali-icon-systemziyuan"></i><br>视频</span></router-link>
            <router-link to="/membership"><span><i class="iconfont ali-icon-systemyonghu"></i><br>我的</span></router-link>
        </div>
        <footer class="footer">
            免责声明:本站不存储任何内容，所有内容均由机器人采集于互联网，新闻视频内容请查看播放源！
        </footer>
       <!-- <footer class="footer">
            &copy; 2019 小v影视&nbsp; &nbsp;
        <div class="rewards-popover-mask" etap="rewards-close"></div>
        <div class="rewards-popover">
            <h3>觉得本站还不错就打赏一下吧！</h3>
            <div class="rewards-popover-item">
                <h4>微信扫一扫打赏</h4>
                <img src="../../assets/images/video/wx.png">
            </div>
            <div class="rewards-popover-item">
                <h4>支付宝扫一扫打赏</h4>
                <img src="../../assets/images/video/zfb.png">
            </div>
            <div style="height:60px;"></div>
            <span class="rewards-popover-close" etap="rewards-close"></span>
        </div>
            </footer>-->
        </div>
</template>

<script>
    import Play from "../pages/video/gaofen/player";
    export default {
        components: {Play}
    }
</script>
<script type='text/javascript' src='@/static/js/main.js'></script>
<script type="text/javascript"> document.body.oncontextmenu=document.body.ondragstart= document.body.onselectstart=document.body.onbeforecopy=function(){return false;};
document.body.onselect=document.body.oncopy=document.body.onmouseup=function(){document.selection.empty();}; </script>
    <script>
    export default{
        data(){
            return{

            }
        }
    }
</script>