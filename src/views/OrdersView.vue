<script setup>
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()

// ISO 时间 → 2026-09-30 14:08
function formatTime(iso) {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// 列表只展示前 4 个商品色块，多余的收拢成 +N
function previewItems(order) {
  return order.items.slice(0, 4)
}
</script>

<template>
  <div class="orders-view">
    <div class="page-head">
      <h1>我的订单</h1>
      <p class="page-sub">共 {{ orderStore.orders.length }} 个订单 · 按下单时间倒序</p>
    </div>

    <!-- 空状态 -->
    <div v-if="!orderStore.orders.length" class="cart-empty">
      <div class="empty-glyph">📦</div>
      <p>还没有订单，去挑选你的第一套装备吧</p>
      <router-link class="primary-btn" :to="{ name: 'products' }">去购物 →</router-link>
    </div>

    <!-- 订单列表 -->
    <div v-else class="order-cards">
      <router-link
        v-for="order in orderStore.orders"
        :key="order.id"
        class="order-card"
        :to="{ name: 'order-detail', params: { id: order.id } }"
      >
        <div class="oc-head">
          <div class="oc-id">
            <span class="oc-label">订单号</span>
            <span class="mono strong">{{ order.id }}</span>
          </div>
          <span class="status-tag">已提交 · 待支付（演示）</span>
        </div>

        <div class="oc-body">
          <div class="oc-thumbs">
            <div
              v-for="item in previewItems(order)"
              :key="item.id"
              class="oc-thumb"
              :style="{ background: item.color }"
              :title="item.name"
            >{{ item.name.slice(0, 2).toUpperCase() }}</div>
            <div v-if="order.items.length > 4" class="oc-thumb oc-thumb-more">
              +{{ order.items.length - 4 }}
            </div>
          </div>

          <div class="oc-summary">
            <div class="oc-line">共 {{ order.totalQty }} 件商品</div>
            <div class="oc-total">¥{{ order.totalPrice }}</div>
          </div>
        </div>

        <div class="oc-foot">
          <span class="oc-time">{{ formatTime(order.createdAt) }} 下单</span>
          <span class="oc-link">查看详情 →</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
