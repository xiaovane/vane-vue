<template>
    <div class="loading-wrapper">
        <div class="loading"></div>
    </div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped>
    .loading-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    .loading {
        justify-content: center;
        display: flex;
        align-items: center;
        background: url(../../assets/images/video/loading.gif) center center no-repeat #fff;
        width: 100%;
        height: 450px;
        z-index: 1000;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
</style>