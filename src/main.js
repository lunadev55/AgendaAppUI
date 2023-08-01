import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PrimeVue from "primevue/config";

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';

const app = createApp(App);

app.config.globalProperties.hostname = "https://localhost:7249"
app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue)

app.mount('#app')
