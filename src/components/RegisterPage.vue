<template>
    <form class="register-form" @submit.prevent="register">
        <h1>Register</h1>
        <input v-model="username" placeholder="Username" required />
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
        />
        <input
            v-model="refillPassword"
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

export default {
    name: "RegisterPage",
    data() {
        return {
            username: "",
            password: "",
            refillPassword: "",
        };
    },
    props: {},
    methods: {
        register: function () {
            if (this.password !== this.refillPassword) {
                this.$notify({
                    title: "Password is not matched",
                    type: "error",
                });
                return;
            }

            axios
                .post("http://localhost:8081/users/register", {
                    username: this.username,
                    password: this.password,
                })
                .then((res) => {
                    console.log("res: ", res);
                    this.$notify({
                        title: "Register successfully!",
                        type: "success",
                    });
                    this.username = "";
                    this.password = "";
                    this.refillPassword = "";
                    setTimeout(function () {
                        window.open("http://localhost:8080/login", "_self");
                    }, 2000);
                })
                .catch((err) => {
                    console.log("err: ", err);
                    this.$notify({
                        title: "Register failed!",
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
