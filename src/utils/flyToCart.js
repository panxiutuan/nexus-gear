/**
 * 购物车飞入动画
 * 从指定元素位置飞一个小球到购物车图标
 */

export function flyToCart(startEl) {
  const cartEl = document.querySelector('.cart-link')
  if (!cartEl || !startEl) return

  const startRect = startEl.getBoundingClientRect()
  const endRect = cartEl.getBoundingClientRect()

  const startX = startRect.left + startRect.width / 2
  const startY = startRect.top + startRect.height / 2
  const endX = endRect.left + endRect.width / 2
  const endY = endRect.top + endRect.height / 2

  // 创建飞球
  const ball = document.createElement('div')
  ball.className = 'fly-ball'
  ball.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #39ff14;
    box-shadow: 0 0 12px rgba(57, 255, 20, 0.8);
    pointer-events: none;
    z-index: 9999;
    left: ${startX}px;
    top: ${startY}px;
    transform: translate(-50%, -50%);
  `
  document.body.appendChild(ball)

  // 计算贝塞尔曲线控制点（向上抛）
  const deltaX = endX - startX
  const deltaY = endY - startY
  const arcHeight = Math.min(-100, deltaY - 100) // 向上抛的高度

  // 强制重排
  ball.offsetHeight

  // 动画
  const duration = 600
  const startTime = performance.now()

  function animate(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 缓动函数
    const easeOutQuad = 1 - (1 - progress) * (1 - progress)

    // 贝塞尔曲线
    const x = startX + deltaX * easeOutQuad
    // Y 轴：先上升再下降
    const y = startY + deltaY * easeOutQuad + arcHeight * Math.sin(progress * Math.PI)

    ball.style.left = `${x}px`
    ball.style.top = `${y}px`
    ball.style.transform = `translate(-50%, -50%) scale(${1 - progress * 0.6})`
    ball.style.opacity = `${1 - progress * 0.3}`

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // 动画结束，购物车图标抖动
      cartEl.classList.add('cart-bump')
      setTimeout(() => cartEl.classList.remove('cart-bump'), 300)
      ball.remove()
    }
  }

  requestAnimationFrame(animate)
}
