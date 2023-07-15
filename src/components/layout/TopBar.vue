<script setup>
import { CONTACTS, SOCIALS } from '../../utils/constants'

defineProps({
  contacts: {
    type: Array,
    default: CONTACTS
  },
  socials: {
    type: Array,
    default: SOCIALS
  }
})
</script>

<template>
  <div class="header-top">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-2">
          <nav class="header-login d-flex">
            <a v-for="contact in contacts" :key="contact.type" :href="contact.link">
              <i :class="`fa ${contact.icon}`"></i> {{ contact.value }}
            </a>
          </nav>
        </div>
        <div class="col-lg-4">
          <nav class="header-social text-right">
            <a v-for="social in socials" :key="social.type" :href="social.link">
              <span>
                <i :class="`fab ${social.icon}`"></i>
              </span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
