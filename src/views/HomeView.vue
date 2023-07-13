<script setup>
import Block from '../components/common/Block.vue'
import { BLOCKS } from '../utils/config'

defineProps({
  blocks: {
    type: Array,
    default: BLOCKS
  }
})
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="home-page">
      <div class="container-fluid">
        <div class="row">
          <Block v-for="block in blocks" :key="block.key" v-bind="block" />
        </div>
      </div>
    </div>
  </section>
</template>
