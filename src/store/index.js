import { createStore } from 'vuex'
import axios from 'axios';

// function updateLocalStorage(products) {
//   localStorage.setItem('products', JSON.stringify(products))
// }

const store = createStore({
  state: {
    // data: {
    products: [],
    quantityInCartStore: []
    // }
  },
  mutations: {
    PUT_PRODUCTS_TO_STATE: (state, payload) => {
      state.products = payload

    },
    INCREASE: (state, index) => {
      // const item = state.products.find( i => i.index === index)
      // if(item) {
      // quantityInModal++
      // }
      // updateLocalStorage(state.products)
      // console.log(index)
      // state.products.map((item) => {
      //   if (item.index === index) { 
      state.products[index].quantity++
      //   // state.products[index].quantityInModal++
      //   }
      console.log()

      // }
      // )

    },

    DECREASE: (state, index) => {
      // state.products.map( (item)=> {
      //   if (item.index === index && item.quantity > 1) { item.quantity-- }
      // })
      if (state.products[index].quantity > 1) {
        state.products[index].quantity--
      }

      console.log(index)
    },

    UPDATE_CART: (state, payload) => {
      console.log(payload)
      state.products[payload.index].quantity = payload.test
      payload.totalInCart = payload.totalInModal
      console.log(payload.totalInCart)
    },

    DELETE_CHECKED: (state, checked) => {
      state.products = state.products.filter(a => !checked.includes(a))
      console.log(checked)
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const { data } = await axios('http://localhost:3000/products', {
          method: "GET"
        })


        commit('PUT_PRODUCTS_TO_STATE', data)

      }
      catch (error) {
        console.log(error)
      }
    },
    async increaseQuantity({ commit }, index) {
      commit('INCREASE', index)
    },
    async saveToStore({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    async decreaseQuantity({ commit }, index) {
      commit('DECREASE', index)
    },
    async deleteCheckedItem({ commit }, checked) {
      commit('DELETE_CHECKED', checked)
    }
  },
  getters: {
    cartTotal(state) {
      let result = [];
      if (state.products.length) {
        for (let el of state.products) {
          result.push(el.price * el.quantity);
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        });

        return result;
      } else {
        return 0;
      }
    },
  },

})

export default store