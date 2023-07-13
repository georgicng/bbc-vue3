<script setup>
import { ref } from 'vue'
import text from './BasicInput.vue'
import select from './BasicSelect.vue'
import textarea from './InputArea.vue'

const props = defineProps({ rows: Array, data: Object })
const components = {
  'f-text': text,
  'f-number': text,
  'f-select': select,
  'f-textarea': textarea
}
const model = ref(props.data)
</script>

<template>
  <form>
    <div class="form-row" v-for="(row, rKey) in rows" :key="`r-${rKey}`">
      <component
        v-for="(col, cKey) in row.cols"
        :key="`r-${rKey}-c-${cKey}`"
        :is="components[`f-${col.type}`]"
        :field="col"
        v-model="model[col.prop]"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
