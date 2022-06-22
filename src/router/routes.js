import { Main } from '../pages/main'
import { Cart } from '../components/cart'

export default [
  {
    path: '/',
    name: 'MainPage',
    component: Main
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

]
