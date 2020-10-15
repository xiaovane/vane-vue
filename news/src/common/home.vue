<template>
    <div class="wrapper">
        <v-head></v-head>
            <div>
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
<!--        <v-ad></v-ad>-->
        <v-foot></v-foot>
    </div>
</template>

<script>
    import vHead from './header.vue';
    import vFoot from './footer.vue';
    import vAd from './components/fixed-ad';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead,vFoot,vAd
        },
        created(){
        }
    }
</script>
