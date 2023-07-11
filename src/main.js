import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import DashboardPage from "./components/DashboardPage.vue";
import Notifications from "@kyvg/vue3-notification";
import VueCookies from "vue-cookies";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/login", component: LoginPage },
        { path: "/register", component: RegisterPage },
        { path: "/", component: DashboardPage },
    ],
});

const app = createApp(App);

app.use(router);
app.use(Notifications);
app.use(VueCookies);

app.mount("#app");
