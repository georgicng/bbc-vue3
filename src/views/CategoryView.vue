<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product'
import { useLoader } from '../composables/useLoader'
import CategoryCard from '../components/product/CategoryCard.vue'

const productStore = useProductStore()

const { categories, categoriesLoading, categoriesError } = storeToRefs(productStore)
const { fetchCategories } = productStore
fetchCategories()
useLoader(categoriesLoading)
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="categories-page">
      <div class="container" id="categories">
        <div class="row">
          <div
            v-for="category in categories"
            :key="category.id"
            class="col-md-6 col-lg-4 col-xl-3 my-3"
          >
            <CategoryCard :category="category" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
