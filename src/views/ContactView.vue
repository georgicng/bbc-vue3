<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSupportStore } from '../stores/support'
import { CONTACT_BLOCKS } from '../utils/constants'
import FormBuilder from '../components/form/FormBuilder.vue'
import Heading from '../components/common/Heading.vue'

const title = 'Contact us'
const subtitle = 'Do you have any questions? Please do not hesitate to contact us directly'
const content = CONTACT_BLOCKS

const supportStore = useSupportStore()
const { processingContact, contactError, contact } = storeToRefs(supportStore)
const { submitContact } = supportStore

const fields = {
  name: {
    type: 'text',
    label: 'Name'
  },
  subject: {
    type: 'text',
    label: 'Subject'
  },
  email: {
    type: 'email',
    label: 'Email'
  },
  message: {
    type: 'textarea',
    label: 'Message'
  }
}
const model = ref({
  name: '',
  subject: '',
  email: '',
  message: ''
})

const log = (type, data) => console.error(type, data)
const onSubmit = (formData) => {
  submitContact(formData)
}
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
      <div class="container-fluid text-center">
        <Heading :title="title" :subtitle="subtitle" />

        <div class="no-back">
          <div class="row">
            <div class="col-md-6 offset-lg-2 col-lg-4 my-3 text-left">
              <FormBuilder :fields="fields" v-model="model" @submit="onSubmit" />
              <div v-if="processingContact" class="spinner-grow spinner-grow-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div v-if="status" class="status form-group">{{ status }}</div>
            </div>
            <div class="col-md-6 col-lg-4 my-3 text-left">
              <div
                v-for="item in content"
                :key="item.key"
                class="d-flex flex-row border h-10 rounded mb-2"
              >
                <div class="p-0 w-20">
                  <img :src="item.image" alt="" class="img-fluid border-0" />
                </div>
                <div class="pl-3 pt-2 pr-2 pb-2 w-80 border-left">
                  <h4 class="py-2">
                    <a v-if="item.link" :href="item.link">{{ item.label }}</a>
                    <span v-else>{{ item.label }}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
