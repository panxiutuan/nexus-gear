<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { categories } from '../data/products'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const cart = useCartStore()
const router = useRouter()

function categoryLabel(key) {
  return categories.find((c) => c.key === key)?.label || ''
}

// 清空购物车前弹出自定义确认框
const showClearConfirm = ref(false)

function handleClear() {
  showClearConfirm.value = true
}

function confirmClear() {
  cart.clear()
  showClearConfirm.value = false
}

function checkout() {
  if (cart.isEmpty) return
  router.push({ name: 'checkout' })
}

function continueShopping() {
  router.push({ name: 'products' })
}

// 输入过程中只接受 >=1 的整数，避免清空输入框瞬间把商品移除
function onQtyInput(id, raw) {
  const n = Number(raw)
  if (Number.isInteger(n) && n >= 1) cart.setQty(id, n)
}

// 失焦时归一化：非法/越界恢复为购物车里的实际数量
function onQtyBlur(item, e) {
  const n = Number(e.target.value)
  if (!Number.isInteger(n) || n < 1 || n > 99) {
    e.target.value = item.qty
  } else {
    cart.setQty(item.id, n)
  }
}
</script>

<template>
  <div class="cart-view">
    <div class="page-head">
      <h1>购物车</h1>
      <p class="page-sub">共 {{ cart.totalQty }} 件商品</p>
    </div>

    <!-- 空状态 -->
    <div v-if="cart.isEmpty" class="cart-empty">
      <div class="empty-glyph">🛒</div>
      <p>购物车还是空的</p>
      <button class="primary-btn" @click="continueShopping">去挑选装备 →</button>
    </div>

    <!-- 购物车主体 -->
    <div v-else class="cart-layout">
      <div class="cart-list">
        <div v-for="item in cart.detailedItems" :key="item.id" class="cart-item">
          <router-link
            class="item-cover"
            :to="{ name: 'product-detail', params: { slug: item.slug } }"
          >
            <img :src="item.image" :alt="item.name" class="item-cover-img" />
          </router-link>

          <div class="item-info">
            <router-link class="item-name" :to="{ name: 'product-detail', params: { slug: item.slug } }">
              {{ item.name }}
            </router-link>
            <span class="item-cat">{{ categoryLabel(item.category) }}</span>
            <div class="item-price">¥{{ item.price }} / 件</div>
          </div>

          <div class="qty-picker">
            <button class="qty-btn" @click="cart.decrement(item.id)" aria-label="减少">−</button>
            <input
              :value="item.qty"
              class="qty-input"
              type="number"
              min="1"
              max="99"
              aria-label="数量"
              @input="onQtyInput(item.id, $event.target.value)"
              @blur="onQtyBlur(item, $event)"
            />
            <button class="qty-btn" @click="cart.increment(item.id)" aria-label="增加">+</button>
          </div>

          <div class="item-subtotal">¥{{ item.subtotal }}</div>

          <button class="remove-btn" @click="cart.removeItem(item.id)" aria-label="移除商品">✕</button>
        </div>

        <div class="cart-list-foot">
          <button class="text-btn" @click="continueShopping">← 继续购物</button>
          <button class="text-btn danger" @click="handleClear">清空购物车</button>
        </div>
      </div>

      <!-- 结算栏 -->
      <aside class="summary">
        <h2 class="summary-title">订单摘要</h2>
        <div class="summary-row">
          <span>商品件数</span>
          <span>{{ cart.totalQty }}</span>
        </div>
        <div class="summary-row">
          <span>商品合计</span>
          <span>¥{{ cart.totalPrice }}</span>
        </div>
        <div class="summary-row">
          <span>运费</span>
          <span class="free">免运费</span>
        </div>
        <div class="summary-total">
          <span>应付总额</span>
          <span class="total-price">¥{{ cart.totalPrice }}</span>
        </div>
        <button class="primary-btn checkout-btn" @click="checkout">去结算</button>
        <p class="summary-note">演示项目 · 暂不支持真实支付</p>
      </aside>
    </div>

    <!-- 清空购物车确认弹窗 -->
    <ConfirmDialog
      v-model:visible="showClearConfirm"
      title="清空购物车"
      message="确定要清空购物车里的所有商品吗？此操作不可撤销。"
      confirm-text="清空"
      cancel-text="取消"
      @confirm="confirmClear"
    />
  </div>
</template>
