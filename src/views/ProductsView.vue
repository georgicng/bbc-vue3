<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useLoader } from '../composables/useLoader'
import Heading from '../components/common/Heading.vue'
import ProductCard from '../components/product/ProductCard.vue'

const route = useRoute()
const category = computed(() => route.query.category)
const productStore = useProductStore()
const { products, loadingProducts, categories, categoriesLoading, categoriesError } =
  storeToRefs(productStore)
const { fetchCategories, fetchProducts } = productStore

watch(
  category,
  async (newVal) => {
    const apis = [fetchProducts({ category: newVal })]
    if (!categories.value?.length) {
      apis.push(fetchCategories())
    }
    Promise.all([...apis])
  },
  { immediate: true }
)
useLoader(loadingProducts)

const title = computed(
  () => categories.value?.find((cat) => cat.id == category.value)?.name
)

const handlePageClick = () => {
  // TODO: call endpoint
  console.log('page clicked')
}
</script>

<template>
  <div id="menu-page" class="page-wrapper innerpage-section-padding">
    <div class="container text-center menu">
      <Heading v-if="title" :title="title" />
      <div id="breakfast-dishes" class="no-back">
        <div class="row">
          <div v-for="product in products" :key="product.id" class="col-sm-6 col-md-4 col-lg-3">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
