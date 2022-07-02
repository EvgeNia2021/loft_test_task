import { ref } from "vue";

export default () => {
  const defQuantityInModal = ref(1);
  const modalActive = ref(false);

  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };
  const closeModal = () => {
    modalActive.value = false;
  };
  const onClickOutside = () =>  {
    modalActive.value = false;
  };
 const increaseItemQuantity = () => {
    defQuantityInModal.value++;
  };

  const decreaseItemQuantity = () => {
    if (defQuantityInModal.value > 1) defQuantityInModal.value--;
  };

  


  return {
    defQuantityInModal,
    modalActive,
    toggleModal,
    closeModal,
    onClickOutside,
    increaseItemQuantity,
    decreaseItemQuantity
  }
}
