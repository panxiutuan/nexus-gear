<script setup>
import { computed } from 'vue'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

// 精选：按评分倒序取 8 件
const featured = computed(() =>
  [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)
)

// 分类区块：每个分类取评分最高的 3 件
const sections = computed(() =>
  categories.map((c) => ({
    ...c,
    items: products
      .filter((p) => p.category === c.key)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)
  }))
)

const points = [
  { glyph: '★', title: '精选好物', desc: '只挑手感与颜值都在线的装备' },
  { glyph: '⚡', title: '极速发货', desc: '24h 内顺丰发出，到手即装' },
  { glyph: '↻', title: '7 天无忧', desc: '不合手感？7 天无理由退换' },
  { glyph: '✦', title: '桌搭玩家', desc: '为颜值党的桌搭方案而准备' }
]

// 品牌故事数据
const brandStory = {
  title: '关于 NEXUS GEAR',
  subtitle: '// BUILT BY GAMERS, FOR GAMERS',
  paragraphs: [
    'NEXUS GEAR 诞生于 2023 年，由一群热爱游戏和桌搭的工程师创立。我们相信，好的外设不仅是工具，更是你桌面宇宙的一部分。',
    '从第一把客制化键盘到第一款无线鼠标，每一件产品都经过团队成员的长期实测。我们不追求 SKU 数量，只做能让自己愿意买单的好东西。'
  ],
  stats: [
    { value: '50K+', label: '用户选择' },
    { value: '15+', label: '自研产品' },
    { value: '98%', label: '好评率' },
    { value: '24h', label: '平均发货' }
  ]
}

// 服务保障
const services = [
  { icon: '🚚', title: '顺丰包邮', desc: '订单满 199 元顺丰包邮，偏远地区也能快速送达' },
  { icon: '🔒', title: '正品保障', desc: '所有产品均为品牌官方授权，支持官方查验' },
  { icon: '🛡️', title: '两年质保', desc: '全系列产品提供 2 年质保服务，售后无忧' },
  { icon: '💬', title: '专业客服', desc: '资深玩家客服团队，帮你选到最适合的装备' },
  { icon: '📦', title: '精美包装', desc: '礼盒级包装，自用有仪式感，送礼有面子' },
  { icon: '🎁', title: '积分商城', desc: '购物累计积分，可兑换限定周边和优惠券' }
]

</script>

<template>
  <div class="home-view">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-scanline"></div>
      <div class="hero-noise"></div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">NEW · 2026 秋季新品已上线</span>
        </div>
        <p class="hero-eyebrow">// NEXUS GEAR · EST. 2023</p>
        <h1 class="hero-title">
          <span class="title-line">为你的</span>
          <span class="title-line highlight-line">
            <span class="glitch" data-text="桌面宇宙">桌面宇宙</span>
          </span>
          <span class="title-line">精选外设装备</span>
        </h1>
        <p class="hero-sub">
          键盘 · 鼠标 · 音频 · 桌搭 —— 为游戏玩家、程序员和桌搭爱好者<br />
          打造的一站式补给站。让每一次敲击都充满仪式感。
        </p>
        <div class="hero-cta">
          <router-link class="primary-btn hero-btn" :to="{ name: 'products' }">
            <span>开始探索</span>
            <span class="btn-arrow">→</span>
          </router-link>
          <router-link class="ghost-btn hero-btn" :to="{ name: 'products', query: { category: 'keyboards' } }">
            浏览键盘系列
          </router-link>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="stat-num">50K+</span>
            <span class="stat-label">玩家选择</span>
          </div>
          <div class="hero-divider"></div>
          <div class="hero-stat">
            <span class="stat-num">98%</span>
            <span class="stat-label">好评率</span>
          </div>
          <div class="hero-divider"></div>
          <div class="hero-stat">
            <span class="stat-num">24h</span>
            <span class="stat-label">极速发货</span>
          </div>
        </div>
      </div>

      <!-- Hero 右侧产品展示 -->
      <div class="hero-visual">
        <div class="floating-product product-1">
          <div class="fp-card">
            <div class="fp-tag">🔥 热销</div>
            <img :src="featured[0]?.image" :alt="featured[0]?.name" class="fp-img" />
            <div class="fp-info">
              <div class="fp-name">{{ featured[0]?.name }}</div>
              <div class="fp-price">¥{{ featured[0]?.price }}</div>
            </div>
          </div>
        </div>
        <div class="floating-product product-2">
          <div class="fp-card">
            <div class="fp-tag alt">⭐ 精选</div>
            <img :src="featured[1]?.image" :alt="featured[1]?.name" class="fp-img" />
            <div class="fp-info">
              <div class="fp-name">{{ featured[1]?.name }}</div>
              <div class="fp-price">¥{{ featured[1]?.price }}</div>
            </div>
          </div>
        </div>
        <div class="floating-product product-3">
          <div class="fp-card small">
            <div class="fp-tag purple">NEW</div>
            <img :src="featured[2]?.image" :alt="featured[2]?.name" class="fp-img" />
            <div class="fp-name-sm">{{ featured[2]?.name }}</div>
          </div>
        </div>

        <!-- 装饰光点 -->
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        <div class="glow-orb orb-3"></div>
      </div>

      <!-- 滚动指示器 -->
      <div class="scroll-indicator">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <span class="scroll-text">向下滚动</span>
      </div>
    </section>

    <!-- 卖点 -->
    <section class="points">
      <div v-for="p in points" :key="p.title" class="point">
        <div class="point-glyph">{{ p.glyph }}</div>
        <div>
          <div class="point-title">{{ p.title }}</div>
          <p class="point-desc">{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 精选 -->
    <section class="block">
      <div class="block-head">
        <h2>精选好物</h2>
        <router-link class="more" :to="{ name: 'products' }">查看全部 →</router-link>
      </div>
      <div class="grid">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- 品牌故事 -->
    <section class="brand-section">
      <div class="brand-content">
        <p class="brand-subtitle">{{ brandStory.subtitle }}</p>
        <h2 class="brand-title">{{ brandStory.title }}</h2>
        <div class="brand-text">
          <p v-for="(p, i) in brandStory.paragraphs" :key="i">{{ p }}</p>
        </div>
        <div class="brand-stats">
          <div v-for="s in brandStory.stats" :key="s.label" class="stat-item">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
      <div class="brand-visual">
        <div class="visual-frame">
          <div class="visual-inner">
            <div class="visual-logo">NG</div>
            <div class="visual-tagline">GEAR FOR PLAYERS</div>
          </div>
        </div>
        <div class="visual-decoration deco-1"></div>
        <div class="visual-decoration deco-2"></div>
      </div>
    </section>

    <!-- 各分类推荐 -->
    <section v-for="s in sections" :key="s.key" class="block">
      <div class="block-head">
        <h2>
          <span class="block-dot" :style="{ background: s.color }"></span>
          {{ s.label }}
        </h2>
        <router-link class="more" :to="{ name: 'products', query: { category: s.key } }">更多 →</router-link>
      </div>
      <div class="grid grid-3">
        <ProductCard v-for="p in s.items" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- 服务保障 -->
    <section class="services-section">
      <div class="services-head">
        <h2>为什么选择我们</h2>
        <p>全方位服务保障，让你的每一次购物都安心无忧</p>
      </div>
      <div class="services-grid">
        <div v-for="s in services" :key="s.title" class="service-card">
          <div class="service-icon">{{ s.icon }}</div>
          <h3 class="service-title">{{ s.title }}</h3>
          <p class="service-desc">{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="cta-banner">
      <div class="cta-content">
        <h2>准备好升级你的桌面了吗？</h2>
        <p>加入 NEXUS GEAR，找到属于你的那套装备</p>
        <div class="cta-actions">
          <router-link class="primary-btn" :to="{ name: 'products' }">立即选购</router-link>
          <router-link class="ghost-btn light" :to="{ name: 'favorites' }">我的收藏</router-link>
        </div>
      </div>
      <div class="cta-bg"></div>
    </section>
  </div>
</template>
