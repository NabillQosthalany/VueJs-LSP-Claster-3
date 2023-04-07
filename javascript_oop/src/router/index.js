import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/Screen/Admin/Product'
import Category from '../views/Screen/Admin/Category'
import LoginView from '../views/Auth/Login'
import UserView from '../views/Screen/User/User'
import LogView from '../views/Screen/Admin/LogPassword'
import AccountView from "@/views/Screen/Admin/Account";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Account',
    name: 'Account',
    component: AccountView
  },
  {
    path: '/Log',
    name: 'Log',
    component: LogView
  },
  {
    path: '/Product',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/Category',
    name: 'Category',
    component: Category,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
