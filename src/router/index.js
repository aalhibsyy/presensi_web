import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Atlet_Data from '../views/Atlet_Data.vue'
import Pelatih_Data from '../views/Pelatih_Data.vue'
import Ukm_Data from '../views/Ukm_Data.vue'
import UkmAtlet_Data from '../views/UkmAtlet_Data.vue'
import PresensiAtlet_Data from '../views/PresensiAtlet_Data.vue'
import PresensiPelatih_Data from '../views/PresensiPelatih_Data.vue'
import Report from '../views/Report.vue'

Vue.use(VueRouter)

function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
//this is just an example. You will have to find a better or 
// centralised way to handle you localstorage data handling 
if(localStorage.getItem('LoggedUser') == "true")
  isAuthenticated = true;
 else
  isAuthenticated= false;

 if(isAuthenticated) 
 {
  next(); // allow to enter route
 } 
 else
 {
  next('/login'); // go to '/login';
 }
}

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    // component: Login,
    beforeEnter: (to, from, next) => {
      console.log("BISAA")
      localStorage.clear();
      // next();
      next({ name: 'Home' });
      window.location.reload();
    },
  
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter : guardMyroute,
    component: Dashboard
  },
  {
    path: '/atlet',
    name: 'atlet',
    beforeEnter : guardMyroute,
    component: Atlet_Data
  },
  {
    path: '/pelatih',
    name: 'pelatih',
    beforeEnter : guardMyroute,
    component: Pelatih_Data
  },
  {
    path: '/ukm',
    name: 'ukm',
    beforeEnter : guardMyroute,
    component: Ukm_Data
  },
  {
    path: '/ukm_atlet',
    name: 'ukm_atlet',
    beforeEnter : guardMyroute,
    component: UkmAtlet_Data
  },
  {
    path: '/presensi_atlet',
    name: 'presensi_atlet',
    beforeEnter : guardMyroute,
    component: PresensiAtlet_Data
  },
  {
    path: '/presensi_pelatih',
    name: 'presensi_pelatih',
    beforeEnter : guardMyroute,
    component: PresensiPelatih_Data
  },
  {
    path: '/report',
    name: 'report',
    beforeEnter : guardMyroute,
    component: Report
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
