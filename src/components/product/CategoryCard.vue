<script setup>
import { RouterLink } from 'vue-router'
import { getImage, getLink } from '../../utils/helpers'

defineProps({ category: { type: Object, required: true } })
</script>

<template>
  <router-link :to="getLink(category)">
    <div class="card">
      <img class="w-100" :src="getImage(category)" alt="Category icon" />
      <div class="btn view-btn">{{ category.name }}</div>
    </div>
  </router-link>
</template>
