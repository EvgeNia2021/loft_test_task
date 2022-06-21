<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
   
  },
  mounted() {
      this.$store.commit('updateCartFromLocalStorage')
    }
}
</script>

<style src="./global.scss" lang="scss"></style>