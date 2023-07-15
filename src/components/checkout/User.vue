<script setup>
import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react'
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'

const props = defineProps({
  user: { type: Object, required: true },
  cityList: { type: Array, required: true }
})
const formRef = useRef()

const schema = useMemo(
  () => ({
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'phone', 'address', 'landmark', 'city'],
    properties: {
      firstName: { type: 'string', title: 'First name' },
      lastName: { type: 'string', title: 'Last name' },
      email: { type: 'string', title: 'Email' },
      phone: { type: 'string', title: 'Phone' },
      address: { type: 'string', title: 'Address' },
      landmark: { type: 'string', title: 'Nearest Landmark' },
      city: {
        type: 'string',
        title: 'City',
        enum: props.cityList
      }
    },
    ...(props.user.city
      ? {
          allOf: [
            {
              if: {
                properties: {
                  city: {
                    const: 'Other'
                  }
                }
              },
              then: {
                properties: {
                  altCity: {
                    type: 'string',
                    title: 'Other City'
                  }
                },
                required: ['altCity']
              }
            }
          ]
        }
      : {})
  }),
  [props.user, props.cityList]
)

const uiSchema = {
  firstName: {
    'ui:autofocus': true
  },
  email: {
    'ui:options': {
      inputType: 'email'
    }
  },
  address: {
    'ui:widget': 'textarea'
  },
  'ui:submitButtonOptions': {
    norender: true
  }
}
</script>

<template>
  <Form
    :ref="formRef"
    :formData="user"
    :schema="schema"
    :uiSchema="uiSchema"
    :validator="validator"
    :showErrorList="false"
    @change="$emit('user', formData)"
  />
</template>
