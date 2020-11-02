import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Register from '@/public/Register.vue';
import Login from '@/public/Login.vue';
import Secure from '@/secure/Secure.vue';
import Dashboard from '@/secure/dashboard/Dashboard.vue';
import Users from '@/secure/users/Users.vue';
import UsersCreate from '@/secure/users/UsersCreate.vue';
import UsersEdit from '@/secure/users/UsersEdit.vue';
import Roles from "@/secure/roles/Roles.vue";
import RolesCreate from "@/secure/roles/RolesCreate.vue";
import RolesEdit from "@/secure/roles/RolesEdit.vue";
import Products from "@/secure/products/Products.vue";
import ProductsCreate from "@/secure/products/ProductsCreate.vue";
import ProductsEdit from "@/secure/products/ProductsEdit.vue";
import Orders from "@/secure/orders/Orders.vue";
import OrderItems from "@/secure/orders/OrderItems.vue";
import Profile from "@/secure/profile/Profile.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {
        path: '',
        component: Secure,
        children: [
            {path: '', redirect: '/dashboard'},
            {path: '/dashboard', component: Dashboard},
            {path: '/profile', component: Profile},
            {path: '/users', component: Users},
            {path: '/users/create', component: UsersCreate},
            {path: '/users/:id/edit', component: UsersEdit},
            {path: '/roles', component: Roles},
            {path: '/roles/create', component: RolesCreate},
            {path: '/roles/:id/edit', component: RolesEdit},
            {path: '/products', component: Products},
            {path: '/products/create', component: ProductsCreate},
            {path: '/products/:id/edit', component: ProductsEdit},
            {path: '/orders', component: Orders},
            {path: '/orders/:id', component: OrderItems},
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
