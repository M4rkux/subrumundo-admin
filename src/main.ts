import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "./index.css";
import { updateApiHeader } from "@/utils/auth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { loadIcons } from "./utils/icons";

loadIcons();
updateApiHeader();

document.title = "Subrumundo Admin";

const app = createApp(App).use(store);
app.use(router);
app.use(store);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
