<script setup>
import { storeToRefs } from 'pinia'
import { ref, watch, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useLoader } from '../composables/useLoader'
import { useCartStore } from '../stores/cart'
import {
  getCityList,
  getShippingList,
  getPaymentOptions,
  getCityShippingMapping
} from '../utils/helpers'
import Heading from '@/components/common/Heading.vue'
import Stepper from '@/components/common/Stepper.vue'
import User from '@/components/checkout/User.vue'
import Payment from '@/components/checkout/Payment.vue'
import Confirmation from '@/components/checkout/Confirmation.vue'
import Shipping from '@/components/checkout/Shipping.vue'

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
  fetchTransaction
} = orderStore
const paymentOptions = ref([])
const shippingOptions = ref({})
const cityList = ref(['Other'])
const cityShippingMap = ref([])
watch(
  config,
  (newVal) => {
    console.log({ newVal })
    if (!newVal) {
      return
    }
    const shippingList = getShippingList(newVal.shipping_method)
    const cityMap = getCityShippingMapping(shippingList?.home?.options)
    const cities = getCityList(newVal.shipping_method)
    console.log({ cities })
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

const activeStep = ref(0)
const invalid = ref(false)
const userRef = ref(null)

const steps = computed(() => [
  {
    title: 'User Details',
    icon: 'fa fa-user',
    key: 'user',
    component: User,
    props: {
      ref: userRef,
      user,
      cityList
    },
    events: {},
    validate() {
      return userRef.value.validate()
    }
  },
  {
    title: 'Delivery Details',
    icon: 'fa fa-truck',
    key: 'shipping',
    component: Shipping,
    props: {
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
    },
    events: {},
    validate() {
      return delivery?.date && delivery?.time && shipping?.id && payment
    }
  },
  {
    title: 'Confirm Order',
    icon: 'fa fa-check',
    key: 'confirm',
    component: Confirmation,
    props: {
      tos,
      cart,
      discount,
      subtotal,
      total,
      shippingRate,
      showError: invalid
    },
    events: {},
    validate() {
      return tos
    }
  },
  {
    title: 'Complete Order',
    icon: 'fa fa-credit-card',
    key: 'pay',
    component: Payment,
    props: {
      payment,
      meta: paymentOptions[payment]?.meta
    },
    events: {},
    validate() {
      return true
    }
  }
])


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
  const valid = steps.value[current].validate()
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
onBeforeMount(async () => await fetchCheckoutConfig())
</script>

<template>
  <section class="page-wrapper innerpage-section-padding">
    <div class="container-fluid">
      <Heading :title="title" :subtitle="subtitle" />
      <div id="checkout-page" class="no-back">
        <div class="row">
          <div class="col-sm-12 offset-lg-2 col-lg-8">
            <Stepper :steps="steps" :activeStep="activeStep">
              <template #action>
                <div
                  :class="`d-flex ${
                    activeStep !== 0 && activeStep !== steps.length - 1
                      ? 'justify-content-between'
                      : 'justify-content-end'
                  }`"
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
                    :disabled="finishing"
                    @click="
                      {
                        complete
                      }
                    "
                  >
                    Finish
                  </button>
                </div>
              </template>
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
