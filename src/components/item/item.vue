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
    <modal>
      <template #modal>
        <div
          class="modal"
          v-show="modalActive"
          v-click-outside="onClickOutside"
        >
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
import { ref } from "vue";
import vClickOutside from "click-outside-vue3";

export default {
  name: "ItemComponent",
  directives: {
    clickOutside: vClickOutside.directive,
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
    indexToStore: {
      type: Number,
    },
  },
  components: {
    modal,
  },
  emits: [
    "saveNumberToStore",
    "checkItem",
    "deleteChecked",
  ],
  data() {
    return {};
  },
  computed: {
    totalInModal() {
      let sumInModal = this.product_data.price * this.defQuantityInModal;
      return sumInModal;
    },
    totalInCart() {
      let sumInCart = this.product_data.price * this.product_data.quantity;
      return sumInCart;
    },
  },

  setup() {
    const modalActive = ref(false);
    const defQuantityInModal = ref(1);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    const closeModal = () => {
      modalActive.value = false;
    };

    return {
      defQuantityInModal,
      modalActive,
      toggleModal,
      closeModal,
    };
  },
  methods: {
    saveNumberToStore() {
      this.$emit("saveNumberToStore", {
        quantityInModal: this.defQuantityInModal,
        indexToStore: this.indexToStore,
        totalInCart: this.totalInCart,
        totalInModal: this.totalInModal,
      });
    },
    increaseItemQuantity() {
      this.defQuantityInModal++;
    },

    decreaseItemQuantity() {
      if (this.defQuantityInModal > 1) this.defQuantityInModal--;
    },

    checkItem(product) {
      this.$emit("checkItem", product);
    },
    deleteChecked() {
      this.$emit("deleteChecked");
    },
    onClickOutside() {
      this.modalActive = false;
    },
  },
};
</script>
<style src="./item.scss" lang="scss" scoped></style>