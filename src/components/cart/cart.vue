<template>
<div class="g-container">
<Navigation />
<div class="cart">
  <div class="cart__title">Корзина</div>
  <div class="table">
    <div class="header">
      <div class="header__counter counter">
        <div class="counter__title">Выделено</div>
        <div class="counter__number">{{ checked.length }}</div>
      </div>
      <div class="header__btn btn" @click="deleteChecked(checked)">
        <div class="btn__cross"></div>
        <div>Удалить отмеченные</div>
      </div>
    </div>
    <ul class="cart__list list">
      <ItemComponent
        v-for="(product, index) in products"
        :key="product.id"
        :product_data="product"
        :index="index"
        :index2="index"
        :id="product.id"
        :products="products"
        @decreaseItemQuantity="decreaseItemQuantity(index)"
        @increaseItemQuantity="increaseItemQuantity(index)"
        @saveNumberToStore="saveNumberToStore"
        @decreaseQuantityInModal="decreaseQuantityInModal(quantityInModal, id)"
        @increaseQuantityInModal="
          increaseQuantityInModal(quantityInModal, index)
        "
        @checkItem="checkItem(product)"
        @deleteChecked="deleteChecked"
        :quantityInCart2="quantityInCart"
        :temp="temp"
        :totalInCart="totalInCart"
      ></ItemComponent>
    </ul>
<div class="cart__footer footer">
  <div class="footer__group">
    <div class="cart__beforeTax tax">
      <div class="tax__title">Промежуточный итог по корзине:</div>
      <div class="tax__sum">{{ cartTotal }}</div>
    </div>
    <div class="cart__tax tax">
      <div class="tax__title">В том числе НДС:</div>
      <div class="tax__sum">{{ tax }}</div>
    </div>
    </div>
    <div class="cart__total total">
      <div class="total__title">Итого:</div>
      <div class="total__number">{{ cartTotal }}</div>
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
    Navigation
  },
  props: ["product", "tempCount"],
  data() {
    return {
      checked: [],
      test: Number,
      index2: Number,
      totalInCart: Number,
      totalInModal: Number
    };
  },
  setup() {
    const quantityInCart = ref(1);
    return {
      quantityInCart,
    };
  },
  emits: [
    "changeQuantity",
    "saveNumberToStore",
    "checkItem",
    "deleteChecked",
    "increaseItemQuantity",
    "toggleModal",
  ],

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
      fetchProducts: "fetchProducts",
      increaseQuantity: "increaseQuantity",
      decreaseQuantity: "decreaseQuantity",
      saveToStore: "saveToStore",
      deleteCheckedItem: "deleteCheckedItem",
    }),

    saveNumberToStore(payload) {
      this.test = payload.quan;
      this.index2 = payload.index2;
      this.totalInCart = payload.totalInCart
      this.totalInModal = payload.totalInModal
      console.log(this.index2);
      this.saveToStore({ test: this.test, index: this.index2, totalInCart: this.totalInCart, totalInModal: this.totalInModal });
    },

    checkItem(product) {
      this.checked.push(product);
      console.log(this.checked);
    },
    deleteChecked(checked) {
      this.deleteCheckedItem(checked);
      this.checked = []
    },
  },
  async mounted() {
    await this.fetchProducts();
  },
};
</script>

<style src="./cart.scss" lang="scss" scoped></style>
