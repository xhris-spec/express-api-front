import { createApp, reactive } from "vue";
import App from "./App.vue";

const state = reactive({ token: "" });

const app = createApp(App);
app.provide("state", state);
app.mount("#app");
