import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import { PromiseDialog } from "vue3-promise-dialog";

const app = createApp(App)
app.use(PromiseDialog);
app.mount("#app");
