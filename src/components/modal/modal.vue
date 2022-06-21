<template>
  <!-- <div class="modal" v-show="modalActive">
    <div class="modal__title">Изменить количество</div>
    <div class="modal__price">{{}} x</div>
    <button type="button" class="modal__btn" @click="decreaseQuantityInModal">
      -
    </button>
    <span type="number" class="modal__input">{{ quantityInModal }}</span>
    <button type="button" class="modal__btn" @click="quantityInModal++">
      +
    </button>
    <button type="button" @click="saveNumberToStore(quantityInModal, index)">
      сохранить
    </button>
    <div class="modal__total">{{ product.price }}</div>
  </div> -->
  <slot name="modal" />
</template>

<script>
// import { mapActions } from "vuex";
// import { ref } from "vue";

export default {
  name: "ModalWindow",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
    },

    modalActive: {},
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  data: function () {
    return {
      show: false,
    };
  },

  emits: ["decreaseItemQuantity", "increaseItemQuantity"],
  // setup() {
  //   const quantityInModal = ref(1);
  //   // const productId = ref(product)
  //   return {
  //     quantityInModal,
  //     // productId
  //   };
    
  // },
  // computed: {
  //   product_total() {
  //     return this.$store.getters.productQuantity(this.product);
  //   },
  // },
  // methods: {
  //   ...mapActions({
  //     saveToStore: "saveToStore",
  //   }),
  //   closeModal: function () {
  //     this.show = false;
  //   },
  //   // saveNumberToStore(quantityInModal, index) {
  //   //   this.saveToStore(quantityInModal, index);
  //   // },
  //   increaseItemQuantity(quantity) {
  //     quantity.value++;
  //   },
  //   decreaseQuantityInModal() {
  //     if (this.quantityInModal > 1) {
  //       this.quantityInModal--;
  //     }
  //   },
  // },
};
</script>
 
<style scoped
       lang="scss">
.modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
}

.modal {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-close {
    border-radius: 50%;
    color: #fff;
    background: #2a4cc7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  &-title {
    color: #0971c7;
  }

  &-content {
    margin-bottom: 20px;
  }

  &-footer {
    &__button {
      background-color: #0971c7;
      color: #fff;
      border: none;
      text-align: center;
      padding: 8px;
      font-size: 17px;
      font-weight: 500;
      border-radius: 8px;
      min-width: 150px;
    }
  }
}
</style>