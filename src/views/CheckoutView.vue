<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/order'

const cart = useCartStore()
const orderStore = useOrderStore()
const router = useRouter()

const form = reactive({
  name: '',
  phone: '',
  address: '',
  remark: ''
})

const errors = reactive({
  name: '',
  phone: '',
  address: ''
})

const submitting = ref(false)

const rules = {
  name(v) {
    if (!v.trim()) return '请输入收货人姓名'
    return ''
  },
  phone(v) {
    if (!v.trim()) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(v.trim())) return '请输入正确的 11 位手机号'
    return ''
  },
  address(v) {
    if (!v.trim()) return '请输入收货地址'
    if (v.trim().length < 5) return '地址至少 5 个字符'
    return ''
  }
}

function validateField(field) {
  errors[field] = rules[field](form[field])
  return !errors[field]
}

// 输入时清掉该字段错误，等下次 blur 或提交再校验，避免边打字边报错
function clearError(field) {
  errors[field] = ''
}

function validateAll() {
  return Object.keys(rules).map(validateField).every(Boolean)
}

function submitOrder() {
  if (submitting.value || cart.isEmpty) return
  if (!validateAll()) return

  submitting.value = true
  // 同步流程用极短延时仅为按钮状态反馈，避免用户连点产生重复订单
  setTimeout(() => {
    const order = orderStore.createOrder({
      detailedItems: cart.detailedItems,
      receiver: form
    })
    cart.clear()
    router.replace({ name: 'order-detail', params: { id: order.id } })
    submitting.value = false
  }, 300)
}
</script>

<template>
  <div class="checkout-view">
    <div class="page-head">
      <h1>确认订单</h1>
      <p class="page-sub">核对商品与收货信息，提交后生成订单草稿（演示项目不产生真实交易）</p>
    </div>

    <!-- 购物车为空：禁止结算 -->
    <div v-if="cart.isEmpty" class="cart-empty">
      <div class="empty-glyph">🛒</div>
      <p>购物车是空的，无法提交订单</p>
      <router-link class="primary-btn" :to="{ name: 'products' }">去挑选装备 →</router-link>
    </div>

    <div v-else class="checkout-layout">
      <div class="checkout-main">
        <!-- 收货信息 -->
        <section class="panel-card">
          <h2 class="card-heading">收货信息</h2>

          <div class="form-grid">
            <label class="field">
              <span class="label">收货人 <i>*</i></span>
              <input
                v-model="form.name"
                class="input"
                :class="{ invalid: errors.name }"
                type="text"
                placeholder="姓名"
                maxlength="20"
                @input="clearError('name')"
                @blur="validateField('name')"
              />
              <span v-if="errors.name" class="err">{{ errors.name }}</span>
            </label>

            <label class="field">
              <span class="label">手机号 <i>*</i></span>
              <input
                v-model="form.phone"
                class="input"
                :class="{ invalid: errors.phone }"
                type="tel"
                inputmode="numeric"
                placeholder="11 位手机号"
                maxlength="11"
                @input="clearError('phone')"
                @blur="validateField('phone')"
              />
              <span v-if="errors.phone" class="err">{{ errors.phone }}</span>
            </label>

            <label class="field field-full">
              <span class="label">收货地址 <i>*</i></span>
              <input
                v-model="form.address"
                class="input"
                :class="{ invalid: errors.address }"
                type="text"
                placeholder="省 / 市 / 区 / 详细地址"
                maxlength="80"
                @input="clearError('address')"
                @blur="validateField('address')"
              />
              <span v-if="errors.address" class="err">{{ errors.address }}</span>
            </label>

            <label class="field field-full">
              <span class="label">订单备注 <em>（选填）</em></span>
              <textarea
                v-model="form.remark"
                class="input textarea"
                placeholder="配送时间、包装要求等"
                maxlength="120"
                rows="2"
              ></textarea>
            </label>
          </div>
        </section>

        <!-- 商品清单 -->
        <section class="panel-card">
          <h2 class="card-heading">商品清单 · {{ cart.totalQty }} 件</h2>
          <div v-for="item in cart.detailedItems" :key="item.id" class="checkout-item">
            <div class="item-cover sm">
              <img :src="item.image" :alt="item.name" class="item-cover-img" />
            </div>
            <div class="item-info">
              <router-link class="item-name" :to="{ name: 'product-detail', params: { slug: item.slug } }">
                {{ item.name }}
              </router-link>
              <span class="item-price">¥{{ item.price }} × {{ item.qty }}</span>
            </div>
            <div class="item-subtotal">¥{{ item.subtotal }}</div>
          </div>
        </section>
      </div>

      <!-- 提交栏 -->
      <aside class="summary">
        <h2 class="summary-title">费用明细</h2>
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
        <button class="primary-btn submit-btn" :disabled="submitting" @click="submitOrder">
          {{ submitting ? '提交中…' : '提交订单' }}
        </button>
        <router-link class="back-cart" :to="{ name: 'cart' }">← 返回购物车修改</router-link>
        <p class="summary-note">提交即生成订单草稿，暂不发起支付</p>
      </aside>
    </div>
  </div>
</template>
