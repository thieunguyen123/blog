import { createRouter, createWebHistory } from 'vue-router'
import About from '../components/About.vue'
import Home from '../components/Home.vue'
import Blog from '../components/Blog.vue'
import Contact from '../components/Contact.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: About },
        { path: '/blog', name: 'Blog', component: Blog },
        { path: '/contact', name: 'Contact', component: Contact },
        { path: '/login', name: 'Login', component: Login },
        { path: '/register', name: 'Register', component: Register },
    ]
})

export default router
