<template>
  <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item">
          <a @click="$router.push({ name: 'MainPage' })">Главная /</a>
        </li>
        <li class="nav__item">
          <a @click="$router.push({ name: 'Cart' })">Корзина</a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  name: "NavigationComponent",
  components: {
  },
};
</script>
<style src="./navigation.scss" lang="scss" scoped></style>