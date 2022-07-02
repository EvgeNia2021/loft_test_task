import { createStore } from 'vuex'
import dataFromJson from "../data.json"


const store = createStore({

  state: {
    products: []

  },
  mutations: {
    PUT_PRODUCTS_TO_STATE: (state, data) => {
      state.products = data

    },

    UPDATE_CART: (state, payload) => {
      state.products[payload.index].quantity = payload.quantityInModalToCart
    },

    DELETE_CHECKED: (state, checked) => {
      state.products = state.products.filter(a => !checked.includes(a))
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const { data } = dataFromJson

        commit('PUT_PRODUCTS_TO_STATE', data)

      }
      catch (error) {
        console.log(error)
      }
    },

    async saveToStore({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    async deleteCheckedItem({ commit }, checked) {
      commit('DELETE_CHECKED', checked)
    }
  },
  getters: {
    cartTotal: state => {
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