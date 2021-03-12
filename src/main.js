import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap"; // Import js file
import "bootstrap/dist/css/bootstrap.min.css"; // Import css file
import axios from "axios";
import VueAxios from "vue-axios";
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store);
app.config.devtools = true
app.mount("#app");
