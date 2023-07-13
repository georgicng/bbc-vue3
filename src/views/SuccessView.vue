<script setup>
import { RouterLink } from 'vue-router'

const title = 'Thank You!'
const subtitle = 'Your order has been recorded'
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
      <div class="container text-center">
        <div class="innerpage-heading">
          <div class="jumbotron text-xs-center">
            <h1 class="display-3">{{ title }}</h1>
            <p class="lead">
              <strong>{{ subtitle }}</strong>
            </p>
            <hr />
            <p>Having trouble? <router-link to="/complaint">Contact us</router-link></p>
            <p class="lead">
              <router-link to="/" class="btn btn-primary btn-sm" role="button">
                Continue to homepage
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
