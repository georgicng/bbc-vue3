<script setup>
import { ref } from 'vue'
import FormBuilder from '../form/FormBuilder.vue'

const props = defineProps({
  showError: { type: Object, required: true },
  timeOptions: { type: Object, required: true },
  delivery: { type: Object, required: true }
})

const emit = defineEmits(['delivery'])

const fields = {
  date: { type: 'date', label: 'Delivery Date', format: 'date' },
  time: {
    type: 'select',
    label: 'Delivery Time',
    options: props.timeOptions
  }
}

const model = ref(props.delivery)
const onChange = () => {
  emit('delivery', model)
}
</script>

<template>
  <div :class="`${showError && 'red'} card my-3`">
    <div class="card-header">Delivery Day</div>
    <div class="card-body">
      <FormBuilder
        :modelValue="model"
        :fields="fields"
        :showErrorList="false"
        @change="onChange"
      />
      <small> For store pickups, you can call in to arrange an earlier time if need be </small>
    </div>
    <div v-if="showError" class="card-body error">Please select a delivery date && time</div>
  </div>
</template>
