import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'

// Services
import { LocalStorageService } from '../services';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      stopIfLogged: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  stopIfLogged(to, next);
  allowIfLogged(to, next);
});

const stopIfLogged = (to, next) => {
  if(to.matched.some(record => record.meta.stopIfLogged)) {
    if (LocalStorageService.getToken()) {
      next('/')
      return;
    }
    next();
  }
}

const allowIfLogged = (to, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (LocalStorageService.getToken()) {
      next();
      return
    }
    next('/login')
  }
}

export default router
