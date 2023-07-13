<script setup>
import CartItems from '../cart/CartItems.vue'
import CartTotals from '../cart/CartTotals.vue'

defineProps({
  showCart: {
    type: Boolean,
    required: true
  },
  cart: {
    type: Array,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  subtotal: {
    type: String,
    required: true
  }
})

defineEmits(['toggle', 'change'])
</script>

<template>
  <div id="shopping-cart-sidebar" :class="`shc-sidebar ${showCart ? 'to-right-toggle' : ''}`">
    <div class="sidecart-closebtn">
      <button class="btn btn-default" id="sidecart-close" @click="$emit('toggle')">&times;</button>
    </div>
    <CartItems :cart="cart" @change="$emit('change')" />
    <CartTotals
      v-if="cart.length"
      link="cart"
      :discount="discount"
      :subtotal="subtotal"
      :total="total"
    />
  </div>
</template>
