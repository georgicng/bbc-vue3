<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  logo: {
    type: String,
    default: '/images/logo.png'
  },
  height: {
    type: String,
    default: '100'
  }
})
</script>

<template>
  <div class="logo-area">
    <div class="container">
      <div class="logo_wrapper">
        <div class="logo">
          <router-link to="/">
            <img :src="logo" class="logo" :height="height" alt="" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
