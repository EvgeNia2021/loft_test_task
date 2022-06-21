import { main } from '../pages/main'
import { Cart } from '../components/cart'

export default [
  {
    path: '/',
    name: 'MainPage',
    component: main
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

]
