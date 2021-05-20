import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// vuex
import store from "./store";

import Home from './components/Home.vue';
import Login from './components/Login.vue';

const routes = [
    { path: '/', name: 'home', component: Home, meta: { title: 'ʟ ᴏ ɴ ᴇ ʟ ʏ', requiresAuth: true } },
    { path: '/login', name: 'login', component: Login, meta: { requiresVisitor: true } },
    
    // { path: '/logout', name: 'logout', component: LogoutUser},

    // { path: '/:id/details', name: 'post-details', component: PostDetails, meta: { requiresAuth: true } },

    // { path: '/messages', name: 'messages', component: Messages, meta: { requiresAuth: true } },
    
    // { path: '/user/:username', name: 'profile', component: Profile, meta: { requiresAuth: true },
    //     children: [
    //         { path: 'photos', name: 'photos', component: profilePhotos},
    //         { path: 'intro', name: 'intro', component: profileIntro},
    //         { path: 'followers', name: 'followers', component: profileFollowers},
    //         { path: 'following', name: 'following', component: profileFollowing}
    //     ]
    // },

    // { path: '/music', name: 'music', component: Music},

    
    // { path: '/:pathMatch(.*)*', redirect: { name: 'home' } }
    //requiresAuth : Nếu chưa Login thì không được truy cập
    //requiresVisitor : Nếu đã Login thì không được truy cập
];

const router = new VueRouter({
    mode:'history',
    routes
});

//READ TITLE
router.beforeEach((to, from, next) => {
    let title = to.meta.title || 'ʟ ᴏ ɴ ᴇ ʟ ʏ';
    document.title = title;
    next();

    if (to.meta.requiresAuth) {
        if (!store.getters.loggedIn) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.meta.requiresVisitor) {
        if (store.getters.loggedIn) {
            next({
                name: 'home',
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router;