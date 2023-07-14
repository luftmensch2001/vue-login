<template>
    <div class="custom-navbar content">
        <img class="logo" src="../assets/images/logo.jpg" />
        <div class="account">
            <span>Welcome, {{ username }}</span>
            <router-link to="/login">
                <button @click="clearCookies">
                    {{ username ? "Logout" : "Login" }}
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { computed } from "vue";

export default {
    setup() {
        const { cookies } = useCookies();

        const username = computed(() => cookies.get("username"));

        const clearCookies = () => {
            cookies.remove("username");
            cookies.remove("accessToken");
        };

        return { username, clearCookies };
    },
};
</script>

<style lang="scss">
@import "../assets/styles/custom-navbar.scss";
</style>
