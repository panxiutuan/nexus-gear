<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const THRESHOLD = 400

function onScroll() {
  visible.value = window.scrollY > THRESHOLD
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="fade-up">
    <button
      v-if="visible"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="回到顶部"
      title="回到顶部"
    >
      ↑
    </button>
  </Transition>
</template>
