import { ref } from 'vue'
import { defineStore } from 'pinia'

let toastId = 0

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function show(message, options = {}) {
    const id = ++toastId
    const toast = {
      id,
      message,
      type: options.type || 'default', // default | success | error | warning
      duration: options.duration ?? 2500
    }
    toasts.value.push(toast)

    if (toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }
    return id
  }

  function success(message, options = {}) {
    return show(message, { ...options, type: 'success' })
  }

  function error(message, options = {}) {
    return show(message, { ...options, type: 'error' })
  }

  function warning(message, options = {}) {
    return show(message, { ...options, type: 'warning' })
  }

  function remove(id) {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx > -1) {
      toasts.value.splice(idx, 1)
    }
  }

  function clear() {
    toasts.value = []
  }

  return {
    toasts,
    show,
    success,
    error,
    warning,
    remove,
    clear
  }
})
