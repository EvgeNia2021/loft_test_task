<template>
  <div class="g-container">
    <Navigation />
    <div class="cart">
      <div class="cart__title">Корзина</div>
      <div class="cart__table">
        <div class="header">
          <div class="header__counter counter">
            <div class="counter__title">Выделено</div>
            <div class="counter__number">{{ checked.length }}</div>
          </div>
          <div class="header__btn btn" @click="OnDeleteChecked(checked)">
            <div class="btn__cross"></div>
            <div class="btn__text">Удалить отмеченные</div>
          </div>
        </div>
        <ul class="cart__list list">
          <ItemComponent
            v-for="(product, index) in products"
            :key="product.id"
            :product_data="product"
            :index="index"
            :indexToStore="index"
            :totalInCart="totalInCart"
            @saveNumberToStore="OnSaveNumberToStore"
            @checkItem="OnCheckItem(product)"
            @deleteChecked="OnDeleteChecked"
          ></ItemComponent>
        </ul>
        <div class="cart__footer footer">
          <div class="footer__group">
            <div class="cart__beforeTax tax">
              <div class="tax__title">Промежуточный итог по корзине:</div>
              <div class="tax__sum">{{ cartTotal }} Р</div>
            </div>
            <div class="cart__tax tax">
              <div class="tax__title">В том числе НДС:</div>
              <div class="tax__sum">{{ tax }} Р</div>
            </div>
          </div>
          <div class="cart__total total">
            <div class="total__title">Итого:</div>
            <div class="total__number">{{ cartTotal }} Р</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ItemComponent } from "../../components/item";
import { Navigation } from "../../components/navigation";
import { mapState, mapActions, mapGetters } from "vuex";
import { ref } from "vue";

export default {
  name: "CartComponent",
  components: {
    ItemComponent,
    Navigation,
  },

  props: ["product"],
  data() {
    return {
      checked: [],
      quantityInModalToCart: Number,
      indexToStore: Number,
      totalInCart: Number,
      totalInModal: Number,
    };
  },
  setup() {
    const quantityInCart = ref(1);
    return {
      quantityInCart,
    };
  },
  emits: ["saveNumberToStore", "deleteChecked"],

  computed: {
    ...mapState({
      products: (state) => state.products,
    }),

    ...mapGetters(["cartTotal"]),

    tax() {
      let taxes = Math.round((this.cartTotal / 100) * 18);
      return taxes;
    },
  },
  methods: {
    ...mapActions({
      saveToStore: "saveToStore",
      deleteCheckedItem: "deleteCheckedItem",
    }),

    OnSaveNumberToStore(payload) {
      this.quantityInModalToCart = payload.quantityInModal;
      this.indexToStore = payload.indexToStore;
      this.totalInCart = payload.totalInCart;
      this.totalInModal = payload.totalInModal;
      this.saveToStore({
        quantityInModalToCart: this.quantityInModalToCart,
        index: this.indexToStore,
        totalInCart: this.totalInCart,
        totalInModal: this.totalInModal,
      });
    },

    OnCheckItem(product) {
      if (this.checked.includes(product)) {
        let productIndex = this.checked.indexOf(product);
        this.checked.splice(productIndex, 1);
      } else {
        this.checked.push(product);
      }
    },

    OnDeleteChecked(checked) {
      this.deleteCheckedItem(checked);
      this.checked = [];
    },
  },
  async mounted() {},
};
</script>

<style src="./cart.scss" lang="scss" scoped></style>
