<template>
    <form class="register-form" @submit.prevent="register">
        <h1>Register</h1>
        <input v-model="state.username" placeholder="Username" required />
        <input
            v-model="state.password"
            type="password"
            placeholder="Password"
            required
        />
        <input
            v-model="state.refillPassword"
            type="password"
            placeholder="Refill password"
            required
        />
        <button type="submit">Register</button>
        <router-link to="/login">Login</router-link>
    </form>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import { notify } from "@kyvg/vue3-notification";

export default {
    name: "RegisterPage",
    setup() {
        const state = reactive({
            username: "",
            password: "",
            refillPassword: "",
        });

        const register = () => {
            if (state.password !== state.refillPassword) {
                notify({
                    title: "Password is not matched",
                    type: "error",
                });
                return;
            }

            axios
                .post("http://localhost:8081/users/register", {
                    userName: state.username,
                    password: state.password,
                })
                .then((res) => {
                    // Register success
                    if (res.data.user) {
                        notify({
                            title: "Register successfully!",
                            type: "success",
                        });

                        setTimeout(function () {
                            window.open("http://localhost:8080/login", "_self");
                        }, 2000);
                    }
                    // Error
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
                        title: "Register failed!",
                        type: "error",
                    });
                });
        };

        return {
            state,
            register,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles/login-register.scss";
</style>
