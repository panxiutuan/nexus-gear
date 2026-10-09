<script setup>
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '../stores/favorite'
import ProductCard from '../components/ProductCard.vue'

const favorite = useFavoriteStore()
const router = useRouter()

function goShopping() {
  router.push({ name: 'products' })
}
</script>

<template>
  <div class="favorites-view">
    <div class="page-head">
      <h1>我的收藏</h1>
      <p class="page-sub">共 {{ favorite.count }} 件收藏商品</p>
    </div>

    <!-- 空状态 -->
    <div v-if="favorite.isEmpty" class="cart-empty">
      <div class="empty-glyph">♡</div>
      <p>还没有收藏任何商品</p>
      <button class="primary-btn" @click="goShopping">去发现好物 →</button>
    </div>

    <!-- 收藏列表 -->
    <div v-else>
      <div class="favorites-toolbar">
        <p class="fav-tip">点击商品卡片右上角 ♥ 可取消收藏</p>
        <button class="text-btn danger" @click="favorite.clear()">清空收藏</button>
      </div>
      <div class="grid">
        <ProductCard v-for="p in favorite.items" :key="p.id" :product="p" :showFavorite="true" />
      </div>
    </div>
  </div>
</template>
