<script setup>
import { computed } from 'vue'
import { TERMS } from '../utils/constants'
import Heading from '../components/common/Heading.vue'

const title = 'Terms and Conditions'
const subtitle =
  'Thanks for your interest in butterbakes cakes. Before you proceed with your order we would like you to be familiar with a our processes and mode of operations.'
const terms = computed(() => Object.entries(TERMS).map(([key, value]) => ({ key, value })))
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="tos-page">
      <div class="container-fluid">
        <Heading :title="title" :subtitle="subtitle" />

        <div class="no-back">
          <div class="row">
            <div class="col-sm-12 offset-lg-2 col-lg-8">
              <ul class="term-list">
                <li v-for="term in terms" :key="term.key">{{ term.value }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
