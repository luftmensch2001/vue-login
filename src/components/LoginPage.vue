<template>
    <form class="login-form" @submit.prevent="checkLogin">
        <h1>Login</h1>
        <input v-model="username" placeholder="Username" required />
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
        />
        <button type="submit">Login</button>
        <router-link to="/register">Register</router-link>
    </form>
</template>

<script>
import axios from "axios";

export default {
    name: "LoginPage",
    props: {},
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        checkLogin: function () {
            axios
                .post("http://localhost:8081/users/login", {
                    username: this.username,
                    password: this.password,
                })
                .then((res) => {
                    this.$cookies.set("accessToken", res.data.accessToken);
                    this.$cookies.set("username", res.data.user.username);
                    window.open("http://localhost:8080", "_self");
                })
                .catch((err) => {
                    console.log("err: ", err);
                    this.$notify({
                        title: "Login failed!",
                        type: "error",
                    });
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles/style.scss";
</style>
