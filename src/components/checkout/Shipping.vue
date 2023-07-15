<script setup>
import DeliveryPeriod from './shipping_cards/DeliveryPeriod'
import ShippingRate from './shipping_cards/ShippingRate'
import PaymentMethod from './shipping_cards/PaymentMethod'
import ShippingMethod from './shipping_cards/ShippingMethod'

defineProps({
  valid: { type: Object, required: true },
  shippingRate: { type: Object, required: true },
  delivery: { type: Object, required: true },
  timeOptions: { type: Object, required: true },
  payment: { type: Object, required: true },
  paymentOptions: { type: Object, required: true },
  user: { type: Object, required: true },
  shipping: { type: Object, required: true },
  shippingOptions: { type: Object, required: true },
  cityShippingMap: { type: Object, required: true },
  showErrors: { type: Object, required: true }
})
</script>

<template>
  <div class="row">
    <div class="col-md-6 mb-3">
      <ShippingMethod
        :showError="showErrors && !shipping?.id"
        :user="user"
        :shipping="shipping"
        :shippingOptions="shippingOptions"
        :cityShippingMap="cityShippingMap"
        @change="$emit('change')"
      />
      <DeliveryPeriod
        :valid="valid && delivery?.time && delivery?.date"
        :delivery="delivery"
        :timeOptions="timeOptions"
        :showError="showErrors && !(delivery?.date && delivery?.time)"
        @change="$emit('change')"
      />
    </div>
    <div class="col-md-6 mb-3">
      <ShippingRate shippingRate="{shippingRate}" />
      <PaymentMethod
        :showError="showErrors && !payment"
        :payment="payment"
        :paymentOptions="paymentOptions"
        @change="$emit('change')"
      />
    </div>
  </div>
</template>
