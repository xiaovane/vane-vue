<template>
    <div>
      <!--  <section class="container">
            <iframe width="100%" height="800" src="http://tv.bingdou.net/live.html" frameborder=0 border=0 marginwidth=0 marginheight=0 scrolling='+s+'></iframe>
        </section>-->
        <transition name="fade">
            <v-loading v-if="isLoading"></v-loading>
        </transition>
        <section class="container" style="margin: 30px 0px">
            <div class="b-listtab-main">
                <div class="s-tab-main">

                    <div class='item' v-for="item in live" style="height: 120px">
                        <router-link :to="'/play/'+item.url" class='js-tongjic'>
                            <div class='cover g-playicon' :title="item.title" style="height: 100px">
                                <img :src="item.image | imgUrlFilter" @error="imgError(item)"/>
                                <span class='pay'>{{item.count}}</span>
                                <span class='hint'>{{item.username}}</span>
                            </div>
                            <div class='detail'>
                                <p class='title g-clear'>
                                    <span class='s1' style="width: 164px;" :title="item.title">{{item.title}}</span>
                                </p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
import api from "../../../common/public/api";
import vLoading  from "../../../common/components/loading";
export default{
    components:{vLoading},
    data() {
        return {
            live: [],
            isLoading:true,
        }
    },
    filters: {
        imgUrlFilter (src) {
            if (!src) return ''
            if (src.indexOf('http') !== 0 && src.indexOf('//') === 0) {
                return 'http:' + src
            }
            return src
        }
    },
    methods: {
        getLive: function () {
            let that = this;
            api.video.getLive()
                .then(response => {
                    that.live = response.data.data;
                    that.isLoading=false;
                    // console.log(that.live)
                })
        },
        imgError(item) {
            item.image = require('../../../assets/images/video/default-img.jpg');
        }
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