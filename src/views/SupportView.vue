<script setup>
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

const fields = [
  {
    cols: [
      {
        cols: 6,
        type: 'text',
        prop: 'firstname',
        name: 'firstname',
        label: 'First name'
      },
      {
        cols: 6,
        type: 'text',
        prop: 'lastname',
        name: 'lastname',
        label: 'Last name'
      }
    ]
  },
  {
    cols: [
      {
        cols: 6,
        type: 'number',
        prop: 'age',
        name: 'age',
        label: 'Age'
      },
      {
        cols: 6,
        type: 'select',
        prop: 'gender',
        name: 'gender',
        label: 'Gender',
        options: [
          {
            value: 'male',
            text: 'Male'
          },
          {
            value: 'female',
            text: 'Female'
          }
        ]
      }
    ]
  },
  {
    cols: [
      {
        cols: 12,
        type: 'textarea',
        prop: 'address',
        name: 'address',
        label: 'Address'
      }
    ]
  }
]
const model = {
  firstname: 'george',
  lastname: 'ikpugbu',
  age: 0,
  gender: '',
  address: ''
}

const log = (type, data) => console.error(type, data)
const onSubmit = ({ formData }) => {
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
              <FormBuilder :rows="fields" :data="model" />
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
