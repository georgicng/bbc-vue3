<script setup>
import { useOrderStore } from '../stores/order'
import Heading from '../components/common/Heading.vue'
import CartItems from '../components/cart/CartItems.vue'
import Coupon from '../components/cart/Coupon.vue'
import CartTotals from '../components/cart/CartTotals.vue'

const title = 'Your Cart'

const orderStore = useOrderStore()
const { cart, discount, tax, subtotal, total, cartAction, addDiscountAmount } = orderStore

const { getCoupon, couponValue } = orderStore
const redeemCoupon = async (coupon) => {
  await getCoupon(coupon)
  addDiscountAmount({ coupon, discount: couponValue })
}
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="shopping-cart-page">
      <div class="container-fluid">
        <Heading :title="title" />

        <div class="no-back">
          <div class="row">
            <div class="col-sm-12 offset-lg-2 col-lg-8">
              <CartItems :cart="cart" @change="cartAction" />
              <Coupon
                v-if="cart.length && discount <= 0"
                :disabled="isLoading"
                @click="redeemCoupon"
              />

              <CartTotals
                v-if="cart.length"
                link="products"
                :tax="tax"
                :subtotal="subtotal"
                :total="total"
                :discount="discount"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
