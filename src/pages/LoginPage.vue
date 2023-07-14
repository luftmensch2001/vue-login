<template>
    <form class="login-form" @submit.prevent="checkLogin">
        <h1>Login</h1>
        <input v-model="state.username" placeholder="Username" required />
        <input
            v-model="state.password"
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
import { reactive } from "vue";
import { useCookies } from "vue3-cookies";
import { notify } from "@kyvg/vue3-notification";

export default {
    name: "LoginPage",
    setup() {
        const state = reactive({
            username: "",
            password: "",
        });

        const { cookies } = useCookies();

        const checkLogin = () => {
            axios
                .post("http://localhost:8081/users/login", {
                    userName: state.username,
                    password: state.password,
                })
                .then((res) => {
                    // Login success
                    if (res.data.user) {
                        cookies.set("accessToken", res.data.accessToken);
                        cookies.set("username", res.data.user.username);
                        window.open("http://localhost:8080", "_self");
                    }
                    // Notify error
                    else {
                        notify({
                            title: res.data,
                            type: "error",
                        });
                    }
                })
                .catch((err) => {
                    console.log("err: ", err);
                    notify({
                        title: "Login failed",
                        type: "error",
                    });
                });
        };

        return {
            state,
            checkLogin,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles/login-register.scss";
</style>
