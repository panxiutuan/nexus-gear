<script setup>
import { computed, ref } from 'vue'
import { categories } from '../data/products'
import { useFavoriteStore } from '../stores/favorite'
import { useCartStore } from '../stores/cart'
import { flyToCart } from '../utils/flyToCart'

const props = defineProps({
  product: { type: Object, required: true },
  showFavorite: { type: Boolean, default: true },
  showQuickAdd: { type: Boolean, default: true }
})

const emit = defineEmits(['added'])

const favorite = useFavoriteStore()
const cart = useCartStore()
const coverRef = ref(null)

const meta = computed(() =>
  categories.find((c) => c.key === props.product.category)
)

const stars = computed(() => {
  const full = Math.round(props.product.rating)
  return Array.from({ length: 5 }, (_, i) => i < full)
})

const isFav = computed(() => favorite.isFavorite(props.product.id))

function toggleFav(e) {
  e.preventDefault()
  e.stopPropagation()
  favorite.toggle(props.product.id)
}

function quickAdd(e) {
  e.preventDefault()
  e.stopPropagation()
  cart.addItem(props.product.id, 1)
  if (coverRef.value) {
    flyToCart(coverRef.value)
  }
  emit('added', props.product)
}
</script>

<template>
  <div class="product-card-wrapper">
    <router-link
      class="product-card"
      :to="{ name: 'product-detail', params: { slug: product.slug } }"
    >
      <div class="card-cover" ref="coverRef">
        <span class="cover-tag">{{ meta?.label }}</span>
        <img :src="product.image" :alt="product.name" class="cover-img" loading="lazy" />
        <!-- 快速加购按钮 -->
        <button
          v-if="showQuickAdd"
          class="quick-add-btn"
          @click="quickAdd"
          aria-label="快速加入购物车"
        >
          + 加入购物车
        </button>
      </div>

      <div class="card-body">
        <h3 class="card-title">{{ product.name }}</h3>

        <div class="card-tags">
          <span v-for="t in product.tags.slice(0, 2)" :key="t" class="tag">{{ t }}</span>
        </div>

        <div class="card-foot">
          <div class="price">¥{{ product.price }}</div>
          <div class="rating" :aria-label="`评分 ${product.rating}`">
            <span
              v-for="(on, i) in stars"
              :key="i"
              class="star"
              :class="{ on }"
            >★</span>
            <span class="rating-num">{{ product.rating.toFixed(1) }}</span>
          </div>
        </div>
      </div>
    </router-link>

    <button
      v-if="showFavorite"
      class="fav-btn"
      :class="{ active: isFav }"
      @click="toggleFav"
      :aria-label="isFav ? '取消收藏' : '收藏商品'"
    >
      {{ isFav ? '♥' : '♡' }}
    </button>
  </div>
</template>
