import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/Home'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'

Vue.use(Router)

const routes = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: Home
    },
    {
      path: '/signIn',
      component: SignIn
    },
    {
      path: '/signUp',
      component: SignUp
    }
  ]
})

routes.beforeEach((to, from, next) => {
  next()
})

export default routes
