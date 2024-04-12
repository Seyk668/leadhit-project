import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AnalyticsView from '../views/AnalyticsView.vue';
import LoginView from '../views/LoginView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'analytics',
		component: AnalyticsView,
		meta: { requiresAuth: true },
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		const leadhitSiteId = localStorage.getItem('leadhit-site-id');
		if (!leadhitSiteId || leadhitSiteId !== '5f8475902b0be670555f1bb3') {
			next({ name: 'login' });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
