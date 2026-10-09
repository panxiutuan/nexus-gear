import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'nexus-gear-orders'
const MAX_ORDERS = 20

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// 生成类真实订单号：NX + 时间戳 base36 + 4 位随机，短且够唯一
function genOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.floor(Math.random() * 0x10000)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')
  return `NX${stamp}${rand}`
}

export const useOrderStore = defineStore('order', () => {
  const orders = ref(loadOrders())

  const latestOrder = computed(() => orders.value[0] || null)

  function getOrder(id) {
    return orders.value.find((o) => o.id === id) || null
  }

  // 提交订单：在下单瞬间对商品做快照，保证后续商品改价/下架不影响历史订单
  // detailedItems 来自 cart store 的 detailedItems getter
  function createOrder({ detailedItems, receiver }) {
    const now = new Date()
    const order = {
      id: genOrderId(),
      status: 'placed', // 演示阶段固定状态，不接支付
      createdAt: now.toISOString(),
      receiver: {
        name: receiver.name.trim(),
        phone: receiver.phone.trim(),
        address: receiver.address.trim(),
        remark: receiver.remark.trim()
      },
      items: detailedItems.map((it) => ({
        id: it.id,
        slug: it.slug,
        name: it.name,
        color: it.color,
        image: it.image,
        price: it.price,
        qty: it.qty,
        subtotal: it.subtotal
      })),
      totalQty: detailedItems.reduce((s, it) => s + it.qty, 0),
      totalPrice: detailedItems.reduce((s, it) => s + it.subtotal, 0)
    }

    orders.value.unshift(order)
    if (orders.value.length > MAX_ORDERS) {
      orders.value = orders.value.slice(0, MAX_ORDERS)
    }
    return order
  }

  watch(
    orders,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch {
        // 存储不可用时静默失败
      }
    },
    { deep: true }
  )

  return { orders, latestOrder, getOrder, createOrder }
})
