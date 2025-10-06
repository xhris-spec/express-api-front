import { createApp, reactive } from "vue";
import App from "./App.vue";
import { getToken } from "./api";

const state = reactive({ token: getToken() || "" });

const app = createApp(App);
app.provide("state", state);
app.mount("#app");
