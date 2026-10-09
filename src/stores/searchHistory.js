import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'nexus-gear-search-history'
const MAX_ITEMS = 10

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.slice(0, MAX_ITEMS)
  } catch {
    return []
  }
}

export const useSearchHistoryStore = defineStore('searchHistory', () => {
  const history = ref(loadHistory())

  function add(keyword) {
    const kw = keyword.trim()
    if (!kw) return
    // 移除已有的重复项
    const idx = history.value.indexOf(kw)
    if (idx > -1) {
      history.value.splice(idx, 1)
    }
    // 添加到最前面
    history.value.unshift(kw)
    // 限制数量
    if (history.value.length > MAX_ITEMS) {
      history.value = history.value.slice(0, MAX_ITEMS)
    }
  }

  function remove(keyword) {
    history.value = history.value.filter((k) => k !== keyword)
  }

  function clear() {
    history.value = []
  }

  watch(
    history,
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
    history,
    add,
    remove,
    clear
  }
})
