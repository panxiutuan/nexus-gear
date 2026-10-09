import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/products'

const STORAGE_KEY = 'nexus-gear-favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // 只保留存在的商品 id
    return parsed.filter((id) => products.some((p) => p.id === id))
  } catch {
    return []
  }
}

export const useFavoriteStore = defineStore('favorite', () => {
  const ids = ref(loadFavorites())

  // 收藏商品详情列表
  const items = computed(() =>
    ids.value
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
  )

  const count = computed(() => ids.value.length)

  const isEmpty = computed(() => ids.value.length === 0)

  function isFavorite(id) {
    return ids.value.includes(id)
  }

  function toggle(id) {
    const idx = ids.value.indexOf(id)
    if (idx > -1) {
      ids.value.splice(idx, 1)
    } else {
      ids.value.push(id)
    }
  }

  function add(id) {
    if (!ids.value.includes(id)) {
      ids.value.push(id)
    }
  }

  function remove(id) {
    ids.value = ids.value.filter((i) => i !== id)
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
    isEmpty,
    isFavorite,
    toggle,
    add,
    remove,
    clear
  }
})
