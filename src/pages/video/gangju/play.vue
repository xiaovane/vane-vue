<template>
    <div>
        <transition name="fade">
            <v-loading v-if="isLoading"></v-loading>
        </transition>
        <iframe id="play-frame" :src="url" width="100%"  allowTransparency="true" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" allowfullscreen="true"></iframe>
    </div>
</template>

<script>

    import vLoading  from "../../../common/components/loading";
    export default {
        name: "play",
        components:{vLoading},
        data() {
            return {
                url:"",
                isLoading:true
            }
        },
        mounted: function () {
            let iframe = document.getElementById("play-frame");
            iframe.style.width = window.innerWidth + 'px';
            iframe.style.height = window.innerHeight + 'px';
            this.url = "https://live.ixigua.com/"+this.$route.params.url;
            this.isLoading=false
        }
    }

</script>

<style scoped>
    html, #play-frame {width: 100%; height: 100%;}
</style>