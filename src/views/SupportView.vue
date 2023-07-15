<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSupportStore } from '../stores/support'
import FormBuilder from '../components/form/FormBuilder.vue'
import Heading from '../components/common/Heading.vue'

const title = 'Lodge a Complaint'
const subtitle =
  'Do you have any complaint about your order? Please do let us know, so we can help.'

const supportStore = useSupportStore()
const { processingIssue, issueError, issue } = storeToRefs(supportStore)
const { submitIssue } = supportStore

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
  description: {
    type: 'textarea',
    label: 'Description'
  }
}
const model = ref({
  name: '',
  subject: '',
  email: '',
  description: '',
})

const log = (type, data) => console.error(type, data)
const onSubmit = (formData) => {
  console.log({ formData })
  submitIssue(formData)
}
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
      <div class="container-fluid text-center">
        <Heading :title="title" :subtitle="subtitle" />

        <div class="no-back">
          <div class="row">
            <div class="col-sm-12 offset-lg-2 col-lg-8 text-left">
              <FormBuilder :fields="fields" v-model="model" @submit="onSubmit" />
              <div v-if="processingIssue" class="spinner-grow spinner-grow-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div v-if="status" class="status form-group">{{ status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
