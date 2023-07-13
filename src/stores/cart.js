import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const orderId = ref(null)
  const discount = ref(0)
  const tax = ref(0)

  const cart = ref([])
  function addItem(payload) {
    cart.value.push(payload)
  }
  function deleteItem(payload) {
    cart.value.splice(payload, 1)
  }
  const changeQuantity = ({ index, quantity }) => {
    cart.value[index].quantity = quantity
  }
  function cartAction(action, value) {
    switch (action) {
      case 'add':
        addItem(value)
        break
      case 'delete':
        deleteItem(value)
        break
      case 'update':
        changeQuantity(value)
    }
  }

  const shipping = ref({ type: '', id: '', rate: 0, express: 0 })
  const shippingRate = computed(
    () => parseFloat(shipping.value?.rate || 0) + parseFloat(shipping.value?.express || 0)
  )

  const subtotal = computed(() =>
    cart.value.reduce((acc, item) => {
      return (acc += parseFloat(item.price) * parseInt(item.quantity))
    }, 0)
  )

  const total = computed(
    () => parseFloat(subtotal) + parseFloat(tax) + parseFloat(shippingRate) - parseFloat(discount)
  )

  return {
    cart,
    discount,
    orderId,
    tax,
    subtotal,
    total,
    shippingRate,
    cartAction
  }
})
