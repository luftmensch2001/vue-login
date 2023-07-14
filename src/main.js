import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import StudentUpdatePage from "./pages/StudentUpdatePage.vue";

import Notifications from "@kyvg/vue3-notification";
import VueCookies from "vue-cookies";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/login", component: LoginPage },
        { path: "/register", component: RegisterPage },
        { path: "/", component: DashboardPage },
        {
            path: "/add-student",
            component: StudentUpdatePage,
            props: { isAddPage: true },
        },
        {
            path: "/update-student/:id",
            component: StudentUpdatePage,
            props: { isAddPage: false },
        },
    ],
});

const app = createApp(App);

app.use(router);
app.use(Notifications);
app.use(VueCookies);

app.mount("#app");
