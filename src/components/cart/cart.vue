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
          <div class="header__btn btn" @click="deleteChecked">
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
            @checkItem="OnCheckItem(product)"
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
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  name: "CartComponent",
  components: {
    ItemComponent,
    Navigation,
  },
  setup() {
    const store = useStore();
    const checked = ref([]);

    onMounted(() => {
      store.dispatch("fetchProducts");
    });

    const OnCheckItem = (product) => {
      if (checked.value.includes(product)) {
        let productIndex = checked.value.indexOf(product);
        checked.value.splice(productIndex, 1);
      } else {
        checked.value.push(product);
      }
    };

    const deleteChecked = () => {
      store.dispatch("deleteCheckedItem", checked.value);
      checked.value = [];
    };

    return {
      products: computed(() => store.state.products),
      cartTotal: computed(() => store.getters.cartTotal),
      tax: computed(() => Math.round((store.getters.cartTotal / 100) * 18)),
      checked,
      OnCheckItem,
      deleteChecked,
    };
  },
};
</script>

<style src="./cart.scss" lang="scss" scoped></style>
