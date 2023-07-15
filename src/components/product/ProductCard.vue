<script setup>
import { RouterLink } from 'vue-router'
import { getImage } from '../../utils/helpers'

defineProps({ product: { type: Object, required: true } })
</script>

<template>
  <div class="dish-list my-3">
    <router-link :to="`/details/${product.id}`">
      <img :src="getImage(product)" class="img-fluid" alt="dish-menu" />
    </router-link>
    <div class="dish-list-text">
      <h4>
        <router-link :to="`/details/${product.id}`">{{ product.name }}</router-link>
      </h4>
      <h5>N{{ product.price }}</h5>
      <router-link :to="`/details/${product.id}`" class="btn">
        Buy Now
        <span>
          <i class="fa fa-shopping-cart"></i>
        </span>
      </router-link>
    </div>
  </div>
</template>
