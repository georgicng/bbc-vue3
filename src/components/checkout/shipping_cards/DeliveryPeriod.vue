<script setup>
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'

const props = defineProps({
  showError: { type: Object, required: true },
  timeOptions: { type: Object, required: true },
  delivery: { type: Object, required: true }
})

const schema = {
  type: 'object',
  properties: {
    date: { type: 'string', title: 'Delivery Date', format: 'date' },
    time: {
      type: 'string',
      title: 'Delivery Time',
      oneOf: props.timeOptions
    }
  }
}

const uiSchema = {
  'ui:submitButtonOptions': {
    norender: true
  }
}
</script>

<template>
  <div :class="`${showError && 'red'} card my-3`">
    <div class="card-header">Delivery Day</div>
    <div class="card-body">
      <Form
        :formData="delivery"
        :schema="schema"
        :uiSchema="uiSchema"
        :validator="validator"
        :showErrorList="false"
        @change="$emit('delivery', formData)"
      />
      <small> For store pickups, you can call in to arrange an earlier time if need be </small>
    </div>
    <div v-if="showError" class="card-body error">Please select a delivery date && time</div>
  </div>
</template>
