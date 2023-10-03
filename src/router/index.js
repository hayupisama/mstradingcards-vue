import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home/main-view.vue';
import LoginView from '@/views/login/main-view.vue';
import RegisterView from '@/views/register/main-view.vue';
import DashboardView from '@/views/dashboard/main-view.vue';
import DeckView from '@/views/create-edit-deck/main-view.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/mydashboard',
    name: 'mydashboard',
    component: DashboardView
  },
  {
    path: '/mydeck',
    name: 'mydeck',
    component: DeckView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
