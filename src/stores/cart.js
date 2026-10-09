import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/products'

const STORAGE_KEY = 'nexus-gear-cart'

// 从 localStorage 恢复，结构异常时安全回退到空购物车
function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // 只保留合法条目：商品存在且数量为正整数
    return parsed.filter(
      (it) => it && products.some((p) => p.id === it.id) && Number.isInteger(it.qty) && it.qty > 0
    )
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  // 购物车最小结构：[{ id, qty }]，商品信息实时从 products 派生
  const items = ref(loadItems())

  // 明细：把 id 关联到完整商品信息，供页面渲染
  const detailedItems = computed(() =>
    items.value
      .map((it) => {
        const product = products.find((p) => p.id === it.id)
        return product ? { ...product, qty: it.qty, subtotal: product.price * it.qty } : null
      })
      .filter(Boolean)
  )

  const totalQty = computed(() =>
    items.value.reduce((sum, it) => sum + it.qty, 0)
  )

  const totalPrice = computed(() =>
    detailedItems.value.reduce((sum, it) => sum + it.subtotal, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  function getQty(id) {
    return items.value.find((it) => it.id === id)?.qty || 0
  }

  // 加入购物车：已存在则累加，封顶 99
  // 采用"整体替换数组"而非"修改元素属性"，确保 ref 的 set 触发所有 computed 重算
  function addItem(id, qty = 1) {
    const idx = items.value.findIndex((it) => it.id === id)
    if (idx >= 0) {
      const next = [...items.value]
      next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + qty) }
      items.value = next
    } else {
      items.value = [...items.value, { id, qty: Math.min(99, qty) }]
    }
  }

  // 直接设置数量，<=0 时移除
  function setQty(id, qty) {
    const idx = items.value.findIndex((it) => it.id === id)
    if (idx < 0) return
    if (qty <= 0) {
      removeItem(id)
      return
    }
    const next = [...items.value]
    next[idx] = { ...next[idx], qty: Math.min(99, Math.floor(qty)) }
    items.value = next
  }

  function increment(id) {
    const idx = items.value.findIndex((it) => it.id === id)
    if (idx < 0) return
    const next = [...items.value]
    next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + 1) }
    items.value = next
  }

  // 减到 0 自动移除
  function decrement(id) {
    const idx = items.value.findIndex((it) => it.id === id)
    if (idx < 0) return
    if (items.value[idx].qty <= 1) {
      removeItem(id)
      return
    }
    const next = [...items.value]
    next[idx] = { ...next[idx], qty: next[idx].qty - 1 }
    items.value = next
  }

  function removeItem(id) {
    items.value = items.value.filter((it) => it.id !== id)
  }

  function clear() {
    items.value = []
  }

  // 任意变更自动持久化（deep 监听数组内对象的 qty 修改）
  watch(
    items,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch {
        // 存储不可用时静默失败，不影响本次会话购物车可用
      }
    },
    { deep: true }
  )

  return {
    items,
    detailedItems,
    totalQty,
    totalPrice,
    isEmpty,
    getQty,
    addItem,
    setQty,
    increment,
    decrement,
    removeItem,
    clear
  }
})
