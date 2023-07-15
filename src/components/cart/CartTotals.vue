<script setup>
import { RouterLink } from 'vue-router'
const LINK_MAP = {
  cart: 'View Cart',
  products: 'Continue Shopping'
}

defineProps({
  link: { type: String, required: true },
  subtotal: { type: String, required: true },
  shipping: { type: String, required: true },
  discount: { type: String, required: true },
  total: { type: String, required: true }
})
</script>

<template>
  <div class="cart-info text-right">
    <h4>
      Sub-total: <span>N{{ subtotal }}</span>
    </h4>

    <h4 v-if="shipping">
      Delivery Cost: <span>N{{ shipping }}</span>
    </h4>

    <h4 v-if="discount > 0">
      Discount (coupon): <span>- N{{ discount }}</span>
    </h4>
    
    <h4>
      Total: <span>N{{ total }}</span>
    </h4>

    <template v-if="link">
      <router-link :to="`/${link}`" class="btn btn-black">
        {{ LINK_MAP[link] }}
      </router-link>
      <router-link to="/checkout" class="btn btn-orange"> Checkout </router-link>
    </template>
  </div>
</template>
