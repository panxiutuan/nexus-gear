import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/products'

const STORAGE_KEY = 'nexus-gear-recently-viewed'
const MAX_ITEMS = 12

function loadRecent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id) => products.some((p) => p.id === id)).slice(0, MAX_ITEMS)
  } catch {
    return []
  }
}

export const useRecentStore = defineStore('recent', () => {
  const ids = ref(loadRecent())

  const items = computed(() =>
    ids.value
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
  )

  const count = computed(() => ids.value.length)

  function add(productId) {
    // 先移除已有的（移到最前面）
    const idx = ids.value.indexOf(productId)
    if (idx > -1) {
      ids.value.splice(idx, 1)
    }
    // 添加到最前面
    ids.value.unshift(productId)
    // 限制数量
    if (ids.value.length > MAX_ITEMS) {
      ids.value = ids.value.slice(0, MAX_ITEMS)
    }
  }

  function remove(productId) {
    ids.value = ids.value.filter((id) => id !== productId)
  }

  function clear() {
    ids.value = []
  }

  watch(
    ids,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch {
        // 静默失败
      }
    },
    { deep: true }
  )

  return {
    ids,
    items,
    count,
    add,
    remove,
    clear
  }
})
