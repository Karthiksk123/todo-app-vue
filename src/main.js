import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

export const bus = createApp();

createApp(App).mount("#app");
