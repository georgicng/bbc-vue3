<script setup>
import TopBar from './TopBar.vue'
import NavBar from './NavBar.vue'
import Logo from './Logo.vue'

defineProps({
  cartItemsCount: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header-lg d-none d-lg-block border-bottom">
    <Logo />
    <TopBar />
    <NavBar :cartItemsCount="cartItemsCount" />
  </div>
</template>
