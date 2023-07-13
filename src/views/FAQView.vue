<script setup>
import { storeToRefs } from 'pinia'
import { useSupportStore } from '../stores/support'
import { useLoader } from '../composables/useLoader'
import AccordionPanel from '../components/common/AccordionPanel.vue'
import Heading from '../components/common/Heading.vue'

const title = 'Complaint Desk'
const subtitle = 'Find answers to your questions below'

const supportStore = useSupportStore()
const { loadingFaq, faqError, faq } = storeToRefs(supportStore)
const { fetchFaq } = supportStore
fetchFaq()
useLoader(loadingFaq)
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="complaint-page">
      <div class="container-fluid text-center">
        <Heading :title="title" :subtitle="subtitle" />
        <div class="no-back">
          <div class="row">
            <div v-if="faq?.length" class="col-sm-12 offset-lg-2 col-lg-8">
              <AccordionPanel v-for="item in faq" :key="item.id" :title="item.question">
                <div v-html="item.answer"></div>
              </AccordionPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
