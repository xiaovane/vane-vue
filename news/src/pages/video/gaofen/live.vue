<template>
    <div>
      <!--  <section class="container">
            <iframe width="100%" height="800" src="http://tv.bingdou.net/live.html" frameborder=0 border=0 marginwidth=0 marginheight=0 scrolling='+s+'></iframe>
        </section>-->
        <section class="container">
            <div class="b-listtab-main">
                <div class="s-tab-main">

                    <div class='item' v-for="item in live" style="height: 120px">
                        <a class='js-tongjic' :href="item.url" target='_blank'>
                            <div class='cover g-playicon' :title="item.title" style="height: 100px">
                                <img :src="item.image"/>
                                <span class='pay'>{{item.count}}</span>
                                <span class='hint'>{{item.username}}</span>
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

export default{
    data() {
        return {
            live: [],
        }
    },
    methods: {
        getLive: function () {
            let that = this;
            api.video.getLive()
                .then(response => {
                    that.live = response.data.data;
                })
        },
    },
    mounted: function () {
        this.getLive();
    }
}
</script>

<style>
    @import '../../../assets/css/video/style.css';
    @import '../../../assets/css/video/cartoon.css';
</style>