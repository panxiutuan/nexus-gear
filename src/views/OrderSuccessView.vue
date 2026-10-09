<script setup>
import { computed } from 'vue'
import { useOrderStore } from '../stores/order'

const props = defineProps({
  id: { type: String, required: true }
})

const orderStore = useOrderStore()
const order = computed(() => orderStore.getOrder(props.id))

// ISO 时间 → 2026-09-30 14:08
const createdAtText = computed(() => {
  if (!order.value) return ''
  const d = new Date(order.value.createdAt)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
})

// 手机号 138****8888 脱敏展示
function maskPhone(phone) {
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}
</script>

<template>
  <div v-if="order" class="order-view">
    <div class="success-banner">
      <div class="success-mark">✓</div>
      <div>
        <h1>订单已提交</h1>
        <p>这是演示订单草稿，不会产生真实扣款或发货</p>
      </div>
    </div>

    <div class="order-meta panel-card">
      <div class="meta-item">
        <span class="meta-label">订单编号</span>
        <span class="mono strong">{{ order.id }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">下单时间</span>
        <span class="mono">{{ createdAtText }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">订单状态</span>
        <span class="status-tag">已提交 · 待支付（演示）</span>
      </div>
    </div>

    <div class="order-grid">
      <div class="order-main">
        <section class="panel-card">
          <h2 class="card-heading">收货信息</h2>
          <div class="receiver">
            <div class="receiver-row">
              <span class="strong">{{ order.receiver.name }}</span>
              <span class="mono">{{ maskPhone(order.receiver.phone) }}</span>
            </div>
            <p class="receiver-addr">{{ order.receiver.address }}</p>
            <p v-if="order.receiver.remark" class="receiver-remark">
              备注：{{ order.receiver.remark }}
            </p>
          </div>
        </section>

        <section class="panel-card">
          <h2 class="card-heading">商品清单 · {{ order.totalQty }} 件</h2>
          <div v-for="item in order.items" :key="item.id" class="checkout-item">
            <div class="item-cover sm" :style="{ background: item.color }">
              {{ item.name.slice(0, 2).toUpperCase() }}
            </div>
            <div class="item-info">
              <router-link class="item-name" :to="{ name: 'product-detail', params: { slug: item.slug } }">
                {{ item.name }}
              </router-link>
              <span class="item-price">¥{{ item.price }} × {{ item.qty }}</span>
            </div>
            <div class="item-subtotal">¥{{ item.subtotal }}</div>
          </div>

          <div class="order-total-row">
            <span>应付总额</span>
            <span class="total-price">¥{{ order.totalPrice }}</span>
          </div>
        </section>
      </div>

      <aside class="summary">
        <h2 class="summary-title">订单摘要</h2>
        <div class="summary-row">
          <span>商品件数</span>
          <span>{{ order.totalQty }}</span>
        </div>
        <div class="summary-row">
          <span>商品合计</span>
          <span>¥{{ order.totalPrice }}</span>
        </div>
        <div class="summary-row">
          <span>运费</span>
          <span class="free">免运费</span>
        </div>
        <router-link class="primary-btn submit-btn" :to="{ name: 'products' }">继续购物 →</router-link>
        <router-link class="back-cart" :to="{ name: 'orders' }">查看全部订单</router-link>
        <router-link class="back-cart" :to="{ name: 'home' }">返回首页</router-link>
      </aside>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="nf-glyph">404</div>
    <p>找不到这个订单</p>
    <router-link class="ghost-btn" :to="{ name: 'home' }">返回首页</router-link>
  </div>
</template>
