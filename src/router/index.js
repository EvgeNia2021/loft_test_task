import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
// import * as api from '../api'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
