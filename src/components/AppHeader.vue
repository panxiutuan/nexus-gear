<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories } from '../data/products'
import { useCartStore } from '../stores/cart'
import { useFavoriteStore } from '../stores/favorite'
import { useSearchHistoryStore } from '../stores/searchHistory'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const favorite = useFavoriteStore()
const searchHistory = useSearchHistoryStore()
const keyword = ref('')
const showDropdown = ref(false)
const searchInputRef = ref(null)
const dropdownRef = ref(null)

// 进入商品列表页时同步 query.search 到输入框
watch(
  () => route.query,
  (q) => {
    keyword.value = route.name === 'products' ? q.search || '' : ''
  },
  { immediate: true }
)

function onBrandClick(e) {
  // 已在首页时点击品牌图标 → 平滑回顶，不触发导航
  if (route.path === '/') {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleFocus() {
  showDropdown.value = true
}

function handleBlur() {
  // 延迟隐藏，允许点击下拉项
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}

function submitSearch() {
  const kw = keyword.value.trim()
  if (kw) {
    searchHistory.add(kw)
  }
  router.push({ name: 'products', query: { search: kw || undefined } })
  showDropdown.value = false
}

function selectHistory(kw) {
  keyword.value = kw
  submitSearch()
}

function removeHistory(e, kw) {
  e.preventDefault()
  e.stopPropagation()
  searchHistory.remove(kw)
}

function clearHistory(e) {
  e.preventDefault()
  e.stopPropagation()
  searchHistory.clear()
}

// 点击外部关闭
function handleClickOutside(e) {
  if (
    searchInputRef.value &&
    !searchInputRef.value.contains(e.target) &&
    dropdownRef.value &&
    !dropdownRef.value.contains(e.target)
  ) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand" @click="onBrandClick">
        <img src="/favicon.svg" class="brand-logo" alt="NEXUS GEAR" />
        <span class="brand-name">NEXUS<span class="brand-accent">GEAR</span></span>
      </router-link>

      <nav class="nav">
        <router-link to="/products" class="nav-link" active-class="active" :class="{ active: route.name === 'products' && !route.query.category }">全部</router-link>
        <router-link
          v-for="c in categories"
          :key="c.key"
          :to="{ name: 'products', query: { category: c.key } }"
          class="nav-link"
          active-class="active"
        >{{ c.label }}</router-link>
      </nav>

      <div class="search-wrapper">
        <form class="search" @submit.prevent="submitSearch">
          <input
            ref="searchInputRef"
            v-model="keyword"
            class="search-input"
            type="text"
            placeholder="搜索商品…"
            aria-label="搜索商品"
            @focus="handleFocus"
            @blur="handleBlur"
          />
          <button class="search-btn" type="submit" aria-label="搜索">⌕</button>
        </form>

        <!-- 搜索历史下拉 -->
        <Transition name="dropdown">
          <div v-if="showDropdown && searchHistory.history.length" class="search-dropdown" ref="dropdownRef">
            <div class="search-dropdown-header">
              <span class="dd-title">搜索历史</span>
              <button class="dd-clear" @click="clearHistory">清空</button>
            </div>
            <div class="search-dropdown-list">
              <div
                v-for="kw in searchHistory.history"
                :key="kw"
                class="search-dropdown-item"
                @click="selectHistory(kw)"
              >
                <span class="dd-icon">🕐</span>
                <span class="dd-text">{{ kw }}</span>
                <button class="dd-remove" @click="removeHistory($event, kw)" aria-label="删除">×</button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div class="header-actions">
        <router-link to="/favorites" class="icon-link fav-link" active-class="active" aria-label="我的收藏">
          <span class="icon-heart">♡</span>
          <span v-if="favorite.count" class="icon-badge fav-badge">{{ favorite.count > 99 ? '99+' : favorite.count }}</span>
        </router-link>
        <router-link to="/orders" class="icon-link orders-link" active-class="active" aria-label="我的订单">
          <span class="cart-icon">📦</span>
        </router-link>
        <router-link to="/cart" class="icon-link cart-link" active-class="active" aria-label="购物车">
          <span class="cart-icon">🛒</span>
          <span v-if="cart.totalQty" class="icon-badge cart-badge">{{ cart.totalQty > 99 ? '99+' : cart.totalQty }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>
