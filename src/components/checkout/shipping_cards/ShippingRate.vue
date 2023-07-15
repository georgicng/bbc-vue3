<script setup>
defineProps({ shippingRate: { type: Object, required: true } })
</script>

<template>
  <div className="counter text-center my-3">
    <i className="fa fa-code fa-2x"></i>
    <h2 className="timer count-title count-number">N{shippingRate}</h2>
    <p className="count-text ">Total Shipping</p>
  </div>
</template>
