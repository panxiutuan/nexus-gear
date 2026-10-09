<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '确认操作' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' }
})

const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

function close() {
  emit('update:visible', false)
}

function confirm() {
  emit('confirm')
  close()
}

function cancel() {
  emit('cancel')
  close()
}

// 支持按 Esc 键关闭
function handleKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm-dialog">
      <div v-if="visible" class="confirm-dialog-overlay" @click.self="cancel">
        <div class="confirm-dialog-box" role="dialog" aria-modal="true">
          <h3 class="confirm-dialog-title">{{ title }}</h3>
          <p class="confirm-dialog-message">{{ message }}</p>
          <div class="confirm-dialog-actions">
            <button class="ghost-btn" @click="cancel">{{ cancelText }}</button>
            <button class="primary-btn confirm-dialog-danger" @click="confirm">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
/* 确认弹窗（类名前缀 confirm-dialog- 避免冲突，全局样式） */
.confirm-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.confirm-dialog-box {
  width: 100%;
  max-width: 400px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 28px 24px;
  box-shadow: var(--shadow);
}

.confirm-dialog-title {
  font-size: 18px;
  margin-bottom: 12px;
}

.confirm-dialog-message {
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.7;
  margin-bottom: 24px;
}

.confirm-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.confirm-dialog-danger {
  background: #e5484d;
  box-shadow: 0 0 20px rgba(229, 72, 77, 0.25);
}

.confirm-dialog-danger:hover {
  box-shadow: 0 0 28px rgba(229, 72, 77, 0.4);
}

/* 过渡动画 */
.confirm-dialog-enter-active,
.confirm-dialog-leave-active {
  transition: opacity 0.2s ease;
}

.confirm-dialog-enter-active .confirm-dialog-box,
.confirm-dialog-leave-active .confirm-dialog-box {
  transition: transform 0.2s ease;
}

.confirm-dialog-enter-from,
.confirm-dialog-leave-to {
  opacity: 0;
}

.confirm-dialog-enter-from .confirm-dialog-box,
.confirm-dialog-leave-to .confirm-dialog-box {
  transform: scale(0.95);
}
</style>
