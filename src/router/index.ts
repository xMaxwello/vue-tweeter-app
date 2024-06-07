import {createRouter, createWebHistory} from 'vue-router';
import homeView from "../views/homeView.vue";
import loginView from "../views/loginView.vue";
import settingsView from "../views/settingsView.vue";
import TweetDetails from "../views/tweetView.vue";

const routes = [
    {
        'path': '/home',
        'name': 'home',
        'component': homeView,
    },

    {
        path: '/tweet/:id',
        name: 'TweetDetails',
        component: TweetDetails,
        props: true
    },

    {
        'path': '/login',
        'name': 'login',
        'component': loginView,
    },

    {
        'path': '/settings',
        'name': 'settings',
        'component': settingsView,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router