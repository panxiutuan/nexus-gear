<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="not-found-page">
    <div class="nf-content">
      <div class="nf-code">
        <span class="nf-4">4</span>
        <span class="nf-0">0</span>
        <span class="nf-4">4</span>
      </div>
      <h1 class="nf-title">页面走丢了</h1>
      <p class="nf-desc">你访问的路径 <code class="nf-path">{{ route.path }}</code> 不存在</p>
      <div class="nf-actions">
        <router-link class="primary-btn" :to="{ name: 'home' }">返回首页</router-link>
        <router-link class="ghost-btn" :to="{ name: 'products' }">去逛逛</router-link>
      </div>
    </div>
  </div>
</template>
