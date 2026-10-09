import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrdersView from '../views/OrdersView.vue'
import OrderSuccessView from '../views/OrderSuccessView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'NEXUS GEAR · 精选电脑外设' }
  },
  {
    // 分类快捷路径：/keyboards、/mice ... 跳转到带 query 的商品列表
    path: '/:category(keyboards|mice|audio|mousepads|accessories)',
    redirect: (to) => ({ name: 'products', query: { category: to.params.category } })
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: { title: '全部商品 · NEXUS GEAR' }
  },
  {
    path: '/products/:slug',
    name: 'product-detail',
    component: ProductDetailView,
    props: true,
    meta: { title: '商品详情 · NEXUS GEAR' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
    meta: { title: '我的收藏 · NEXUS GEAR' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { title: '购物车 · NEXUS GEAR' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    meta: { title: '确认订单 · NEXUS GEAR' }
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView,
    meta: { title: '我的订单 · NEXUS GEAR' }
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: OrderSuccessView,
    props: true,
    meta: { title: '订单详情 · NEXUS GEAR' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: '页面不存在 · NEXUS GEAR' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
