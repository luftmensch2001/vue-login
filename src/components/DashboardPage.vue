<template>
    <div class="dashboard">
        <h1 v-if="username">Hello {{ username }}</h1>
        <h1 v-else>Please Login</h1>
        <router-link to="/login">
            <button @click="clearCookies">
                {{ username ? "Logout" : "Login" }}
            </button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "DashboardPage",
    props: {},
    data() {
        return {
            username: this.$cookies.get("username"),
        };
    },
    methods: {
        clearCookies: function () {
            this.$cookies.remove("username");
            this.$cookies.remove("accessToken");
        },
    },
    mounted: function () {
        if (this.$cookies.get("username")) {
            this.$notify({
                title: "Login successfully!",
                type: "success",
            });
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles/style.scss";
</style>
