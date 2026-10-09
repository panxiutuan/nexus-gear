<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

const route = useRoute()
const router = useRouter()

// ───── 当前筛选/排序状态：全部从 URL query 取，刷新可还原 ─────
const activeCategory = computed(() => (route.query.category || '').toString())
const keyword = computed(() => (route.query.search || '').toString())
const sort = computed(() => (route.query.sort || 'default').toString())
const minPrice = computed(() => {
  const v = Number(route.query.minPrice)
  return Number.isFinite(v) && v > 0 ? v : null
})
const maxPrice = computed(() => {
  const v = Number(route.query.maxPrice)
  return Number.isFinite(v) && v > 0 ? v : null
})

// 价格滑块本地状态（拖动时实时更新UI，释放时才写URL）
const sliderMin = ref(0)
const sliderMax = ref(2000)

// 价格范围
const priceMin = 0
const priceMax = 1500

// 初始化滑块值
watch(
  () => [route.query.minPrice, route.query.maxPrice],
  () => {
    sliderMin.value = minPrice.value ?? priceMin
    sliderMax.value = maxPrice.value ?? priceMax
  },
  { immediate: true }
)

const sortOptions = [
  { value: 'default', label: '默认' },
  { value: 'price-asc', label: '价格 ↑' },
  { value: 'price-desc', label: '价格 ↓' },
  { value: 'rating-desc', label: '评分 ↓' }
]

// ───── 计算属性链：分类 → 搜索 → 价格 → 排序 ─────
const filtered = computed(() => {
  let list = products
  if (activeCategory.value) list = list.filter((p) => p.category === activeCategory.value)

  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter((p) =>
      [p.name, p.description, p.category, ...p.tags]
        .join(' ')
        .toLowerCase()
        .includes(kw)
    )
  }

  if (minPrice.value !== null) {
    list = list.filter((p) => p.price >= minPrice.value)
  }
  if (maxPrice.value !== null) {
    list = list.filter((p) => p.price <= maxPrice.value)
  }
  return list
})

const sorted = computed(() => {
  const list = [...filtered.value]
  switch (sort.value) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return list.sort((a, b) => b.rating - a.rating)
    default:
      return list
  }
})

// ───── 改 query 用 replace，避免堆栈膨胀 ─────
function setQuery(patch) {
  const next = { ...route.query, ...patch }
  Object.keys(next).forEach((k) => next[k] === undefined && delete next[k])
  router.replace({ name: 'products', query: next })
}

function pickCategory(key) {
  setQuery({ category: key || undefined })
}

function pickSort(e) {
  setQuery({ sort: e.target.value === 'default' ? undefined : e.target.value })
}

function applyPriceFilter() {
  const min = sliderMin.value > priceMin ? sliderMin.value : undefined
  const max = sliderMax.value < priceMax ? sliderMax.value : undefined
  setQuery({ minPrice: min, maxPrice: max })
}

function clearPriceFilter() {
  sliderMin.value = priceMin
  sliderMax.value = priceMax
  setQuery({ minPrice: undefined, maxPrice: undefined })
}

const activeLabel = computed(
  () => categories.find((c) => c.key === activeCategory.value)?.label || '全部商品'
)

const hasActiveFilter = computed(() => {
  return activeCategory.value || keyword.value || minPrice.value !== null || maxPrice.value !== null
})

function clearAllFilters() {
  setQuery({
    category: undefined,
    search: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sort: undefined
  })
}

const breadcrumbItems = computed(() => {
  const items = [
    { label: '首页', to: { name: 'home' } },
    { label: '全部商品', to: { name: 'products' } }
  ]
  if (activeCategory.value) {
    const cat = categories.find((c) => c.key === activeCategory.value)
    if (cat) {
      items.push({ label: cat.label })
    }
  }
  return items
})
</script>

<template>
  <div class="products-view">
    <Breadcrumb :items="breadcrumbItems" class="list-breadcrumb" />

    <div class="page-head">
      <h1>{{ activeLabel }}</h1>
      <p class="page-sub">共 {{ sorted.length }} 件商品</p>
    </div>

    <div class="filter-layout">
      <!-- 侧边筛选 -->
      <aside class="filter-sidebar">
        <div class="filter-section">
          <h3 class="filter-title">价格区间</h3>
          <div class="price-slider-wrap">
            <div class="price-range-display">
              <span class="price-val">¥{{ sliderMin }}</span>
              <span class="price-sep">—</span>
              <span class="price-val">¥{{ sliderMax }}</span>
            </div>
            <div class="dual-slider">
              <input
                type="range"
                v-model.number="sliderMin"
                :min="priceMin"
                :max="priceMax"
                class="slider slider-min"
                @change="applyPriceFilter"
              />
              <input
                type="range"
                v-model.number="sliderMax"
                :min="priceMin"
                :max="priceMax"
                class="slider slider-max"
                @change="applyPriceFilter"
              />
            </div>
          </div>
          <div class="price-quick">
            <button
              class="price-preset"
              @click="sliderMin = 0; sliderMax = 300; applyPriceFilter()"
            >300 以下</button>
            <button
              class="price-preset"
              @click="sliderMin = 300; sliderMax = 800; applyPriceFilter()"
            >300-800</button>
            <button
              class="price-preset"
              @click="sliderMin = 800; sliderMax = 1500; applyPriceFilter()"
            >800 以上</button>
          </div>
          <button
            v-if="minPrice !== null || maxPrice !== null"
            class="clear-price-btn"
            @click="clearPriceFilter"
          >清除价格筛选</button>
        </div>
      </aside>

      <!-- 主内容 -->
      <div class="filter-main">
        <div class="toolbar">
          <div class="tabs">
            <button
              class="tab"
              :class="{ active: !activeCategory }"
              @click="pickCategory('')"
            >全部</button>
            <button
              v-for="c in categories"
              :key="c.key"
              class="tab"
              :class="{ active: activeCategory === c.key }"
              :style="{ '--tab-accent': c.color }"
              @click="pickCategory(c.key)"
            >{{ c.label }}</button>
          </div>

          <label class="sort">
            <span>排序</span>
            <select :value="sort" @change="pickSort">
              <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </label>
        </div>

        <div v-if="sorted.length" class="grid">
          <ProductCard v-for="p in sorted" :key="p.id" :product="p" />
        </div>

        <div v-else class="empty">
          <div class="empty-glyph">∅</div>
          <p>没有找到符合条件的商品</p>
          <button v-if="hasActiveFilter" class="ghost-btn" @click="clearAllFilters">清除全部筛选</button>
          <router-link v-else class="ghost-btn" :to="{ name: 'home' }">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
