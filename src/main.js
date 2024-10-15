import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import CategoryService from './services/categoryService';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";




const app = createApp(App)
const pinia = createPinia();

CategoryService.init(app);


app.use(router)
app.use(pinia);
app.mount('#app')
