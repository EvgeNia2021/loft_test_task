<template>
  <div class="g-container">
    <div class="main__title">Рыба главной страницы, нажмите на корзину</div>
    <Navigation />
  </div>
</template>
<script>
import { Navigation } from '../../components/navigation'
export default {
  name: "MainPage",
  components: {
    Navigation
  },
};
</script>
<style src="./main.scss" lang="scss" scoped></style>

