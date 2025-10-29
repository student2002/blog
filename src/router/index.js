import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta:{index:1}
	},
	{
		path: '/blog',
		name: 'blog',
		component: () => import(/* webpackChunkName: "about" */ '../views/BlogView.vue'),
		children: [
			{ path: '/', redirect: '/BlogList' },
			{
				path: '/BlogList',
				name: '/BlogList',
				component: () => import(/* webpackChunkName: "about" */'@/views/BlogList'),
				meta:{index:2}
			},
			{
				path: '/details',
				name: '/details',
				component: () => import(/* webpackChunkName: "about" */'@/views/details'),
				meta:{index:3}
			},

		]
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
