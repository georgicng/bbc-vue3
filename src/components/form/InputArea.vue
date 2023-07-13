<script setup>
defineProps({
  field: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
</script>

<template>
  <div class="form-group" :class="[ field.cols ? `cols-md-${field.cols}` : '' ]">
    <label :for="field.name">{{ field.label }}</label>
    <textarea
      class="form-control"
      :id="field.name"
      :name="field.name"
      :value="modelValue"      
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
