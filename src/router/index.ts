import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/visitor/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import ProfileView from '@/views/user/ProfileView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/profile',
			name: 'profile',
			component: ProfileView,
			meta: { requiresAuth: true },
		}
	],
});

export default router;
