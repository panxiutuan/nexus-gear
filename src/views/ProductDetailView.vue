<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { getProductBySlug, products, categories } from '../data/products'
import { useCartStore } from '../stores/cart'
import ProductCard from '../components/ProductCard.vue'

const props = defineProps({
  slug: { type: String, required: true }
})

const cart = useCartStore()
// 用 storeToRefs 解构出响应式 getter 引用，保证依赖追踪稳定
const { detailedItems } = storeToRefs(cart)
const qty = ref(1)
const justAdded = ref(false)
const previewOpen = ref(false)
let feedbackTimer = null

const product = computed(() => getProductBySlug(props.slug))
const meta = computed(() =>
  categories.find((c) => c.key === product.value?.category)
)

// 切换商品时重置数量与反馈状态，并关闭预览
watch(
  () => props.slug,
  () => {
    qty.value = 1
    justAdded.value = false
    previewOpen.value = false
  }
)

function openPreview() {
  previewOpen.value = true
}

function closePreview() {
  previewOpen.value = false
}

function onOverlayClick(e) {
  // 只点遮罩背景才关闭，点图片/关闭按钮不触发
  if (e.target === e.currentTarget) closePreview()
}

function onKeydown(e) {
  if (e.key === 'Escape' && previewOpen.value) closePreview()
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKeydown)
  // 组件卸载时移除，避免泄漏
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}

function addToCart() {
  if (!product.value) return
  cart.addItem(product.value.id, qty.value)
  justAdded.value = true
  clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => (justAdded.value = false), 1600)
}

// 相关推荐：同分类下排除自身，最多 3 件
const related = computed(() => {
  if (!product.value) return []
  return products
    .filter((p) => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 3)
})

const stars = computed(() => {
  if (!product.value) return []
  const full = Math.round(product.value.rating)
  return Array.from({ length: 5 }, (_, i) => i < full)
})

// 购物车中本商品数量：依赖 store 的 getter，响应可靠
const cartQty = computed(
  () => detailedItems.value.find((it) => it.id === product.value?.id)?.qty || 0
)
</script>

<template>
  <div v-if="product" class="detail-view">
    <div class="detail-grid">
      <div class="cover" :style="{ background: product.color }">
        <span class="cover-tag">{{ meta?.label }}</span>
        <img
          v-if="product.image"
          class="cover-img-detail"
          :src="product.image"
          :alt="product.name"
          @click="openPreview"
        />
        <span v-else class="cover-initials">{{ product.name.slice(0, 2).toUpperCase() }}</span>
        <span class="cover-price">¥{{ product.price }}</span>
      </div>

      <div class="info">
        <h1 class="info-title">{{ product.name }}</h1>
        <div class="info-rating">
          <span v-for="(on, i) in stars" :key="i" class="star" :class="{ on }">★</span>
          <span class="rating-num">{{ product.rating.toFixed(1) }}</span>
        </div>
        <p class="info-desc">{{ product.description }}</p>

        <h3 class="block-title">规格</h3>
        <ul class="specs">
          <li v-for="s in product.specs" :key="s">{{ s }}</li>
        </ul>

        <div class="cta">
          <div class="qty-picker">
            <button class="qty-btn" @click="qty = Math.max(1, qty - 1)" aria-label="减少数量">−</button>
            <input
              v-model.number="qty"
              class="qty-input"
              type="number"
              min="1"
              max="99"
              aria-label="购买数量"
              @blur="qty = Math.min(99, Math.max(1, Number(qty) || 1))"
            />
            <button class="qty-btn" @click="qty = Math.min(99, qty + 1)" aria-label="增加数量">+</button>
          </div>
          <div class="cta-right">
            <div class="cta-price">¥{{ product.price }}</div>
            <button
              class="buy-btn"
              :class="{ added: justAdded }"
              @click="addToCart"
            >{{ justAdded ? '已加入 ✓' : '加入购物车' }}</button>
          </div>
        </div>
        <p v-if="cartQty" class="in-cart-tip">
          购物车中已有 {{ cartQty }} 件 ·
          <router-link :to="{ name: 'cart' }">去购物车查看</router-link>
        </p>
      </div>
    </div>

    <section class="related">
      <h2 class="section-title">同分类推荐</h2>
      <div class="grid">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- 图片放大预览 -->
    <div v-if="previewOpen" class="image-preview-overlay" @click="onOverlayClick">
      <div class="image-preview-content">
        <button class="image-preview-close" @click.stop="closePreview" aria-label="关闭预览">✕</button>
        <img :src="product.image" :alt="product.name" @click.stop />
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="nf-glyph">404</div>
    <p>找不到这个商品</p>
    <router-link class="ghost-btn" :to="{ name: 'products' }">回到商品列表</router-link>
  </div>
</template>
