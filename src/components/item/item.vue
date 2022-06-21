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
      <div class="item__total">{{ totalInCart }}</div>
    </div>
    <modal>
      <template #modal>
        <div class="modal" v-show="modalActive">
          <div class="modal__title">Изменить количество</div>
          <div class="modal__price">{{ product_data.price }} x</div>
          <button
            type="button"
            class="modal__btn"
            @click="decreaseItemQuantity"
          >
            -
          </button>
          <span type="number" class="modal__input">{{ quantityInCart }}</span>
          <button
            type="button"
            class="modal__btn"
            @click="increaseItemQuantity"
          >
            +
          </button>
          <span type="number" class="modal__input">{{ totalInModal }}</span>
          <button type="button" @click="saveNumberToStore(temp)">
            сохранить
          </button>
          <button
            type="button"
            @click="
              closeModal();
              modalActive = false;
            "
          >
            закрыть
          </button>
          <div class="modal__total">{{ product_data.price }}</div>
        </div>
      </template>
    </modal>
  </li>
</template>

<script>
import { modal } from "../modal";
import { ref } from "vue";
import { mapActions } from "vuex";

export default {
  name: "ItemComponent",
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      },
    },
    quantityInCart2: {
      type: Number,
    },
    index: {
      type: Number,
    },

    id: {
      type: Number,
    },
    index2: {
      type: Number,
    },
  },
  components: {
    modal,
  },
  emits: [
    "increaseItemQuantity",
    "decreaseItemQuantity",
    "saveNumberToStore",
    "increaseQuantityInModal",
    "decreaseQuantityInModal",
    "checkItem",
    "deleteChecked",
  ],
  data() {
    return {};
  },
  computed: {
    totalInModal() {
      let sumInModal = this.product_data.price * this.quantityInCart;
      return sumInModal;
    },
    totalInCart() {
      let sumInCart = this.product_data.price * this.product_data.quantity;
      return sumInCart;
    },
    quan() {
      let result = this.temp;
      return result;
    },
  },

  setup() {
    const modalActive = ref(false);
    // const totalInCart = ref(product_data.price)
    const quantityInCart = ref(1);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    const closeModal = () => {
      modalActive.value = false;
    };

    return {
      quantityInCart,
      modalActive,
      toggleModal,
      closeModal,
      // totalInCart
    };
  },
  methods: {
    ...mapActions({
      saveToStore: "saveToStore",
    }),
    saveNumberToStore() {
      const quan = this.quantityInCart;
      this.$emit("saveNumberToStore", {
        quan: quan,
        index2: this.index2,
        totalInCart: this.totalInCart,
        totalInModal: this.totalInModal,
      });
    },
    // refreshModal() {
    //   this.$emit("refreshModal");
    // },

    increaseItemQuantity() {
      this.quantityInCart++;
    },

    decreaseItemQuantity() {
      if (this.quantityInCart > 1) this.quantityInCart--;
    },

    checkItem(product) {
      this.$emit("checkItem", product);
    },
    deleteChecked() {
      this.$emit("deleteChecked");
    },
    onClick: function (modalActive) {
      modalActive.value = false;
    },
  },
  mounted: function () {
    window.addEventListener("click", this.onClick);
  },
};
</script>
<style src="./item.scss" lang="scss" scoped></style>