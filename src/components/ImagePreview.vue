<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['update:visible', 'close'])

const isShow = ref(false)

watch(
  () => props.visible,
  (val) => {
    isShow.value = val
  }
)

function close() {
  isShow.value = false
  emit('update:visible', false)
  emit('close')
}

function handleOverlayClick(e) {
  if (e.target === e.currentTarget) {
    close()
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="image-preview">
      <div v-if="isShow" class="image-preview-overlay" @click="handleOverlayClick">
        <div class="image-preview-content" @click.stop>
          <button class="image-preview-close" @click="close" aria-label="关闭">×</button>
          <img :src="src" :alt="alt" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
