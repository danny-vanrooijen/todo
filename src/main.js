import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { FontAwesomeIcon } from "@/plugins/font-awesome.js";

import "./index.css";

// Create the App
createApp(App)
  .use(store)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
