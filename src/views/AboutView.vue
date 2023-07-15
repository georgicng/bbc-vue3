<script setup>
import { ABOUT_US } from '../utils/constants'
import Heading from '../components/common/Heading.vue'

const title = 'About Us'
const subtitle = 'Welcome to the world of beautiful buttercream cakes'
const content = ABOUT_US
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
      <div class="container-fluid">
        <Heading :title="title" :subtitle="subtitle" />

        <div class="no-back">
          <div class="row">
            <div class="col-sm-12 offset-lg-2 col-lg-8">
              <p v-for="(p, index) in content" :key="index">{{ p }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
