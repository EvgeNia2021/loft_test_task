import { createStore } from 'vuex'


const store = createStore({
  state: {
    products: [
      {
        "image": "img1.jpg",
        "name": "Нож складной WENGER",
        "price": 990,
        "id": 1,
        "quantity": 1
      },
      {
        "image": "img2.jpg",
        "name": "Рюкзак WENGER",
        "price": 5500,
        "id": 2,
        "quantity": 1
      },
      {
        "image": "img3.png",
        "name": "Перьевая ручка Waterman",
        "price": 450,
        "id": 3,
        "quantity": 1
      }
    ],
  },
  mutations: {
    UPDATE_CART: (state, payload) => {
      state.products[payload.index].quantity = payload.quantityInModalToCart
      payload.totalInCart = payload.totalInModal
    },

    DELETE_CHECKED: (state, checked) => {
      state.products = state.products.filter(a => !checked.includes(a))
    }
  },
  actions: {
    async saveToStore({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    async deleteCheckedItem({ commit }, checked) {
      commit('DELETE_CHECKED', checked)
    }
  },
  getters: {
    fetchProducts: state => {
      return state.products
    },
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