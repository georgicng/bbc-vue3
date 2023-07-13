<script setup>
defineProps({
  field: { type: Object, required: true },
  modelValue: { type: String, required: true }
})
</script>

<template>
  <div class="form-group" :class="[field.cols ? `cols-md-${field.cols}` : '']">
    <label :for="field.name">{{ field.label }}</label>
    <select
      class="form-control"
      :id="field.name"
      :name="field.name"
      :value="modelValue"
      @select="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="(option, key) in field.options" :key="key" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
