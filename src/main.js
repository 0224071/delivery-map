import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap"; // Import js file
import "bootstrap/scss/bootstrap.scss"; 
import axios from "axios";
import VueAxios from "vue-axios";
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store);
app.config.devtools = true
app.mount("#app");
