<script setup>
import { computed, ref, watch } from 'vue'
import text from './BasicInput.vue'
import select from './BasicSelect.vue'
import textarea from './InputArea.vue'

const props = defineProps({
  fields: { type: Object, required: true },
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['change', 'submit'])
const components = {
  text,
  number: text,
  email: text,
  select,
  textarea
}
const model = ref(props.modelValue)
const records = computed(() =>
  Object.entries(props.fields).map(([key, value]) => ({ key, ...value }))
)
watch(
  model,
  (value) => {
    emit('update:modelValue', value)
  },
  { deep: true }
)
</script>

<template>
  <form novalidate @submit.prevent="$emit('submit', model)">
    <component
      v-for="record in records"
      :key="record.key"
      :is="components[`${record.type}`]"
      :field="record"
      v-model="model[record.key]"
    />
    <slot> </slot>
    <slot name="actions"><button type="submit" class="btn btn-primary mb-2">Submit</button></slot>
  </form>
</template>
