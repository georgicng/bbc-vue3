<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  logo: {
    type: String,
    default: '/images/logo_text.png'
  },
  height: {
    type: String,
    default: '45'
  },
  cartItemsCount: {
    type: String,
    required: true
  }
})
defineEmits(['toggle-nav', 'toggle-cart'])
</script>

<template>
  <div class="header d-lg-none">
    <div class="fixed-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col d-flex justify-content-start align-items-center">
            <div class="header-links">
              <button id="sidenav-open" class="btn-link" @click="$emit('toggle-nav')">
                <span>
                  <i class="fa fa-bars"></i>
                </span>
              </button>
            </div>
          </div>

          <div class="col">
            <div class="header-logo f-none text-center">
              <router-link to="/">
                <img class="logo" :src="logo" :height="height" alt="" />
              </router-link>
            </div>
          </div>

          <div class="col d-flex justify-content-end align-items-center">
            <div class="header-links">
              <button id="shc-side-open" class="btn-link" @click="$emit('toggle-cart')">
                <span>
                  <i class="fa fa-shopping-cart"></i>
                </span>
                <span class="cart-badge">{{ cartItemsCount }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
