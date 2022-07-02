<template>
  <li class="item">
    <div class="item__controls">
      <label class="radio radio--checkbox">
        <input
          type="checkbox"
          class="radio__elem"
          @click="checkItem(product_data)"
        />
        <div class="radio__title">{{ index + 1 }}</div>
      </label>
    </div>
    <div class="item__pic">
      <img
        class="item__img"
        :src="require('../../assets/images/' + product_data.image)"
        alt="image"
      />
    </div>
    <div class="item__name">{{ product_data.name }}</div>
    <div class="item__info">
      <div class="item__price">{{ product_data.price }} Р</div>
      <div class="item__quantity">
        <button type="button" class="item__button" @click="toggleModal">
          {{ product_data.quantity }}
        </button>
      </div>
      <div class="item__total">{{ totalInCart }} Р</div>
    </div>
    <modal v-if="modalActive">
      <template #modal>
        <div class="modal" v-click-outside="onClickOutside">
          <div class="modal__title">Изменить количество</div>
          <div class="modal__change change">
            <div class="change__price">{{ product_data.price }} x</div>

            <button
              type="button"
              class="change__btn"
              @click="decreaseItemQuantity"
            >
              -
            </button>
            <span type="number" class="change__input">{{
              defQuantityInModal
            }}</span>
            <button
              type="button"
              class="change__btn"
              @click="increaseItemQuantity"
            >
              +
            </button>
            <span type="number" class="change__total"
              >{{ totalInModal }} Р</span
            >
          </div>
          <div class="change__btns btns">
            <button
              type="button"
              class="btns__save"
              @click="
                saveNumberToStore();
                modalActive = false;
              "
            >
              сохранить
            </button>
            <button
              type="button"
              class="btns__decline"
              @click="
                closeModal();
                modalActive = false;
              "
            >
              отменить
            </button>
          </div>
        </div>
      </template>
    </modal>
  </li>
</template>

<script>
import { modal } from "../modal";
import { computed } from "vue";
import { useStore } from "vuex";
import vClickOutside from "click-outside-vue3";
import useModal from "../composables/useModal";

export default {
  name: "ItemComponent",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    modal,
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
    },
  },
  emits: ["checkItem",],
  setup(props, { emit }) {
    const {
      defQuantityInModal,
      modalActive,
      toggleModal,
      closeModal,
      onClickOutside,
      increaseItemQuantity,
      decreaseItemQuantity,
    } = useModal();
    const store = useStore();

    const totalInModal = computed(() => {
      let sumInModal = props.product_data.price * defQuantityInModal.value;
      return sumInModal;
    });
    const totalInCart = computed(() => {
      let sumInCart = props.product_data.price * props.product_data.quantity;
      return sumInCart;
    });

    const saveNumberToStore = () => {
      store.dispatch("saveToStore", {
        quantityInModalToCart: defQuantityInModal.value,
        index: props.index,
      });
    };
    
    const checkItem = (product) => {
      emit("checkItem", product);
    };
  

    return {
      defQuantityInModal,
      modalActive,
      toggleModal,
      closeModal,
      onClickOutside,
      increaseItemQuantity,
      decreaseItemQuantity,
      totalInModal,
      totalInCart,
      checkItem,
      // deleteChecked,
      saveNumberToStore,
    };
  },
};
</script>
<style src="./item.scss" lang="scss" scoped></style>