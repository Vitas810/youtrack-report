import Vue from 'vue'
import VueRouter from 'vue-router'
import Tasks from "@/components/Tasks";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: Tasks,
  },
]

const router = new VueRouter({
  routes
})

export default router
