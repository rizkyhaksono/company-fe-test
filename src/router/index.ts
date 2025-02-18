import { createRouter, createWebHistory } from 'vue-router';
import { getCookie } from '@/libs/cookies';
import HomeView from '@/views/visitor/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import UserProfileView from '@/views/user/UserProfileView.vue';

import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';
import AdminBannerView from '@/views/admin/AdminBannerView.vue';
import AdminDescriptionView from '@/views/admin/AdminDescriptionView.vue';
import AdminContactView from '@/views/admin/AdminContactView.vue';

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
			component: UserProfileView,
			meta: { requiresAuth: true },
		},
		{
			path: '/admin/dashboard',
			name: 'admin-dashboard',
			component: AdminDashboardView,
			meta: { requiresAuth: true, requiresAdmin: true },
		},
		{
			path: '/admin/dashboard/banner',
			name: 'admin-dashboard-banner',
			component: AdminBannerView,
			meta: { requiresAuth: true, requiresAdmin: true },
		},
		{
			path: '/admin/dashboard/description',
			name: 'admin-dashboard-description',
			component: AdminDescriptionView,
			meta: { requiresAuth: true, requiresAdmin: true },
		},
		{
			path: '/admin/dashboard/contact',
			name: 'admin-dashboard-contact',
			component: AdminContactView,
			meta: { requiresAuth: true, requiresAdmin: true },
		}
	],
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!getCookie('company_token')) {
			next({ name: 'login' });
		}
		else if (to.matched.some(record => record.meta.requiresAdmin)) {
			if (getCookie('company_role') === 'admin') {
				next();
			}
			else {
				next({ name: 'home' });
			}
		}
		else {
			next();
		}
	}
	else {
		next();
	}
});

export default router;
