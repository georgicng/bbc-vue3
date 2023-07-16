<script setup>
import { storeToRefs } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoader } from '../composables/useLoader'
import { useCartStore } from '../stores/cart'
import { getCityList, getShippingList, getPaymentOptions, getCityShippingMapping } from '../utils'
import Heading from '../components/Heading'
import Stepper from '../components/Stepper'

const title = 'Checkout'
const subtitle = 'Complete your order'
const orderStore = useCartStore()
const {
  user,
  delivery,
  cart,
  discount,
  subtotal,
  total,
  shippingRate,
  tos,
  payment,
  express,
  shipping,
  order,
  orderId,
  loadingConfig,
  config,
  isLoading: finishing,
  transaction: orderReference, 
  loadingTransaction: submitting
} = storeToRefs(orderStore)
const {
  addUserDetails,
  addShipping,
  addPaymentMethod,
  addDeliveryPeriod,
  acceptTerms,
  addOrderId,
  fetchCheckoutConfig,
  submitOrder,
  fetchTransaction,
} = orderStore
await fetchCheckoutConfig()

const paymentOptions = ref([])
const shippingOptions = ref({})
const cityList = ref(['Other'])
const cityShippingMap = ref([])
watch(
  config,
  (newVal) => {
    if (!newVal) {
      return
    }
    const shippingList = getShippingList(newVal.shipping_method)
    const cityMap = getCityShippingMapping(shippingList?.home?.options)
    const cities = getCityList(newVal.shipping_method)
    const payments = getPaymentOptions(newVal.payment_methods)
    shippingOptions.value = shippingList
    cityShippingMap.value = cityMap
    cityList.value = cities
    paymentOptions.value = payments
  },
  { immediate: true }
)
useLoader(loadingConfig)

const timeOptions = computed(
  () => [
    {
      const: '11-1 PM',
      title: '11AM - 1PM'
    },
    {
      const: '1-3 PM',
      title: '1-3 PM'
    },
    ...(shipping?.type === 'partner'
      ? [
          {
            const: '3-5 PM',
            title: '3-5 PM'
          }
        ]
      : [])
  ],
  [shipping]
)

const handleChange = (key, value) => {
  console.log({ key, value })
  switch (key) {
    case 'user':
      addUserDetails(value)
      break
    case 'shipping':
      addShipping(value)
      break
    case 'express':
      addShipping({
        ...shipping,
        express: shipping.express ? 0 : 1000
      })
      break
    case 'payment':
      addPaymentMethod(value)
      break
    case 'delivery':
      addDeliveryPeriod(value)
      break
    case 'tos':
      acceptTerms(tos ? false : true)
      break
    default:
      return null
  }
}

const steps = [
  { title: 'User Details', icon: 'fa fa-user', key: 'user' },
  { title: 'Delivery Details', icon: 'fa fa-truck', key: 'shipping' },
  { title: 'Confirm Order', icon: 'fa fa-check', key: 'confirm' },
  { title: 'Complete Order', icon: 'fa fa-credit-card', key: 'pay' }
]
const activeStep = ref(0)
const invalid = ref(false)
const userRef = ref(null)
const getSectionComponent = computed(() => {
  const comps = [
    {
      key: () => import('../components/checkout/User.vue'),
      bind: {
        ref: userRef,
        user,
        cityList
      }
    },
    {
      key: () => import('../components/checkout/Shipping.vue'),
      bind: {
        showErrors: invalid,
        shippingRate,
        delivery,
        timeOptions,
        payment,
        paymentOptions,
        user,
        shipping,
        shippingOptions,
        express,
        cityShippingMap
      }
    },
    {
      key: () => import('../components/checkout/Confirmation.vue'),
      bind: {
        tos,
        cart,
        discount,
        subtotal,
        total,
        shippingRate,
        showError: invalid
      }
    },
    {
      key: () => import('../components/checkout/Payment.vue'),
      bind: {
        payment,
        meta: paymentOptions[payment]?.meta
      }
    }
  ]
  return comps[activeStep]
})

const validateStep = (step) => {
  switch (step) {
    case 0:
      return userRef.value.validate()
    case 1:
      return delivery?.date && delivery?.time && shipping?.id && payment
    case 2:
      return tos
    default:
      return true
  }
}

const router = useRouter()
const complete = async () => {
  if (payment === 'transfer') {
    const payload = {
      order: orderId,
      payment: 'Transfer',
      confirm: true
    }
    await submitOrder(payload)
    router.push('/success')
  }
}

const navigateTo = (to, current, hook) => {
  const valid = validateStep(current)
  if (!valid) {
    invalid.value = true
    return
  }
  invalid.value = false
  if (typeof hook === 'function') {
    hook()
  }
  activeStep.value = to
}
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div class="container-fluid">
      <Heading :title="title" :subtitle="subtitle" />
      <div id="checkout-page" class="no-back">
        <div class="row">
          <div class="col-sm-12 offset-lg-2 col-lg-8">
            <Stepper :steps="steps" :activeStep="activeStep" />
            <div :style="{ padding: '20px' }">
              <component :is="getSectionComponent.key" v-bind="getSectionComponent.bind" />
            </div>
            <div
              class="`d-flex ${ activeStep !== 0 && activeStep !== steps.length - 1 ? 'justify-content-between' : 'justify-content-end' }`"
              style="
                 {
                  padding: '0 20px';
                }
              "
            >
              <button
                v-if="activeStep !== 0 && activeStep !== steps.length - 1"
                class="btn"
                @click="() => navigateTo(activeStep - 1, activeStep)"
              >
                Previous
              </button>
              <button
                v-if="activeStep !== steps.length - 1"
                class="btn"
                :disabled="steps[activeStep].key === 'confirm' && submitting"
                @click="
                  () =>
                    navigateTo(
                      activeStep + 1,
                      activeStep,
                      steps[activeStep].key === 'confirm'
                        ? async () => {
                            await submitOrder(order)
                            addOrderId(orderReference.order_id)
                          }
                        : null
                    )
                "
              >
                Next
              </button>
              <button
                v-if="activeStep === steps.length - 1"
                class="btn"
                disabled="{finishing}"
                onClick="{complete}"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
