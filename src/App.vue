<template>
    <custom-navbar
        v-if="this.$route.path !== '/login' && this.$route.path !== '/register'"
    />
    <router-view></router-view>
    <notifications position="bottom right" />
</template>

<script>
import CustomNavbar from "./components/CustomNavbar.vue";
export default {
    name: "App",
    components: { CustomNavbar },
};
</script>

<style>
@import "./assets/styles/global.css";
</style>
