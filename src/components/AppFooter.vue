<script setup>
import { categories } from '../data/products'
import { useToastStore } from '../stores/toast'

const toast = useToastStore()
const year = new Date().getFullYear()

// 占位链接：暂无对应页面，点击提示「建设中」
function comingSoon(name) {
  toast.warning(`「${name}」页面正在建设中`)
}
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="brand-mark">N</div>
        <div>
          <div class="brand-name">NEXUS<span class="brand-accent">GEAR</span></div>
          <p class="footer-tag">为游戏玩家 · 程序员 · 桌搭玩家而生</p>
        </div>
      </div>

      <div class="footer-cols">
        <div class="footer-col">
          <h4>分类</h4>
          <router-link
            v-for="c in categories"
            :key="c.key"
            :to="{ name: 'products', query: { category: c.key } }"
          >{{ c.label }}</router-link>
        </div>
        <div class="footer-col">
          <h4>关于</h4>
          <router-link :to="{ name: 'orders' }">我的订单</router-link>
          <a href="#" @click.prevent="comingSoon('品牌故事')">品牌故事</a>
          <a href="#" @click.prevent="comingSoon('联系我们')">联系我们</a>
          <a href="#" @click.prevent="comingSoon('售后支持')">售后支持</a>
        </div>
        <div class="footer-col">
          <h4>帮助</h4>
          <a href="#" @click.prevent="comingSoon('配送说明')">配送说明</a>
          <a href="#" @click.prevent="comingSoon('退换货')">退换货</a>
          <a href="#" @click.prevent="comingSoon('FAQ')">FAQ</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ year }} NEXUS GEAR · 仅作学习作品，不含真实交易</span>
    </div>
  </footer>
</template>
