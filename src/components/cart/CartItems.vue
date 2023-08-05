<script setup>
import CartItem from "./CartItem.vue";
import { RouterLink } from 'vue-router'

defineProps({ cart: { type: Array, required: true } })
</script>

<template>
  <template v-if="!cart.length">
    <h1><i class="fab fa-superpowers"></i> Your Cart is Empty</h1>
    <router-link to="/products" class="btn btn-orange">
      <i class="fa fa-home"></i> Go Shopping
    </router-link>
  </template>
  <ul class="list-unstyled cart-list">
    <li v-for="(item, index) in cart" :key="item.line.id">
      <CartItem v-bind="item" @change="$emit('change', { index, quantity: $event })" @delete="$emit('delete', index)" />
    </li>
  </ul>
</template>
