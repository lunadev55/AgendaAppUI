import { createRouter, createWebHistory } from 'vue-router'
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"

// lazy-loaded
const Dashboard = () => import("./components/Dashboard.vue")
const Contact = () => import("./components/Contact.vue")

const routes = [
    {
        path: "/",
        alias: ['/login'],
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/contact/:id",
        name: "Contact",
        component: Contact,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn){
        next('/login');
    } else {
        next();
    }

    if (authRequired) {
        next('/login');
    } else {
        next();
    }
});

export default router;
