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
import { ref, onMounted } from "vue";
import { useCookies } from "vue3-cookies";
import { notify } from "@kyvg/vue3-notification";

export default {
    name: "DashboardPage",
    setup() {
        const { cookies } = useCookies();

        const username = ref(cookies.get("username"));

        const clearCookies = () => {
            cookies.remove("username");
            cookies.remove("accessToken");
        };

        onMounted(() => {
            if (username.value) {
                notify({
                    title: "Login successfully",
                    type: "success",
                });
            }
        });
        return {
            username,
            clearCookies,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles/style.scss";
</style>
