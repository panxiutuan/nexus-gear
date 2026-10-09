// 商品数据（纯静态，第一阶段不接后端）
// 字段说明：
// - slug: 用于详情路由 /products/:slug，保证唯一
// - color: 商品卡片/详情色块的主色，作为图片背景色
// - image: 商品 SVG 插画路径
// - rating: 1-5 的评分，用于排序和展示
// - tags: 用于搜索匹配（除 name 外的额外关键词）

import imgTklPro from '../assets/products/nexus-tkl-pro.svg'
import img65Custom from '../assets/products/nexus-65-custom.svg'
import imgNumpadMini from '../assets/products/nexus-numpad-mini.svg'
import imgAir58 from '../assets/products/nexus-air-58.svg'
import imgProWireless from '../assets/products/nexus-pro-wireless.svg'
import imgSuperlight from '../assets/products/nexus-superlight.svg'
import imgProHeadset from '../assets/products/nexus-pro-headset.svg'
import imgBudsX from '../assets/products/nexus-buds-x.svg'
import imgMicUsb from '../assets/products/nexus-mic-usb.svg'
import imgClothXl from '../assets/products/nexus-cloth-xl.svg'
import imgGlassPad from '../assets/products/nexus-glass-pad.svg'
import imgDeskMatPro from '../assets/products/nexus-desk-mat-pro.svg'
import imgWristRest from '../assets/products/nexus-wrist-rest.svg'
import imgCableComb from '../assets/products/nexus-cable-comb.svg'
import imgMonitorArm from '../assets/products/nexus-monitor-arm.svg'

export const categories = [
  { key: 'keyboards', label: 'Keyboards', color: '#39ff14' },
  { key: 'mice', label: 'Mice', color: '#00e5ff' },
  { key: 'audio', label: 'Audio', color: '#ff2bd6' },
  { key: 'mousepads', label: 'Mousepads', color: '#ffb400' },
  { key: 'accessories', label: 'Accessories', color: '#9b5cff' }
]

export const products = [
  // ───────── Keyboards ─────────
  {
    id: 'kb-001',
    slug: 'nexus-tkl-pro',
    name: 'NEXUS TKL Pro',
    category: 'keyboards',
    price: 899,
    rating: 4.8,
    color: '#39ff14',
    image: imgTklPro,
    tags: ['机械键盘', 'TKL', '87键', '热插拔'],
    specs: ['80% TKL', 'Gasket 结构', '三模连接', 'PBT 二色键帽'],
    description: '紧凑 87 键布局，Gasket 减震结构搭配三模连接，办公游戏两不误。'
  },
  {
    id: 'kb-002',
    slug: 'nexus-65-custom',
    name: 'NEXUS 65 Custom',
    category: 'keyboards',
    price: 1299,
    rating: 4.7,
    color: '#22cc10',
    image: img65Custom,
    tags: ['机械键盘', '65%', '客制化', 'RGB'],
    specs: ['65% 布局', 'CNC 铝合金外壳', ' south-facing PCB', 'RGB 灯效'],
    description: '客制化爱好者首选，CNC 铝合金外壳配 south-facing 灯效，手感扎实。'
  },
  {
    id: 'kb-003',
    slug: 'nexus-numpad-mini',
    name: 'NEXUS Numpad Mini',
    category: 'keyboards',
    price: 349,
    rating: 4.4,
    color: '#1d8a07',
    image: imgNumpadMini,
    tags: ['数字小键盘', '紧凑', '热插拔'],
    specs: ['17 键', '旋钮音量调节', 'Type-C 有线', '热插拔'],
    description: '为数据工作者准备的独立数字小键盘，带音量旋钮，热插拔可玩性高。'
  },

  // ───────── Mice ─────────
  {
    id: 'ms-001',
    slug: 'nexus-air-58',
    name: 'NEXUS Air 58',
    category: 'mice',
    price: 599,
    rating: 4.9,
    color: '#00e5ff',
    image: imgAir58,
    tags: ['轻量化', '游戏鼠标', '无线', 'FPS'],
    specs: ['58g 轻量化', 'PAW3395 传感器', '4000Hz 回报率', '三模连接'],
    description: '58g 超轻机身配 PAW3395 旗舰传感器，FPS 玩家的精准利器。'
  },
  {
    id: 'ms-002',
    slug: 'nexus-pro-wireless',
    name: 'NEXUS Pro Wireless',
    category: 'mice',
    price: 699,
    rating: 4.6,
    color: '#00b3cc',
    image: imgProWireless,
    tags: ['无线鼠标', '办公', '人体工学'],
    specs: ['人体工学外形', '8000 DPI', '80h 续航', '2.4G + 蓝牙'],
    description: '人体工学造型久握不累，多设备一键切换，办公高效利器。'
  },
  {
    id: 'ms-003',
    slug: 'nexus-superlight',
    name: 'NEXUS Superlight',
    category: 'mice',
    price: 749,
    rating: 4.5,
    color: '#007fa0',
    image: imgSuperlight,
    tags: ['电竞', '轻量化', '有线'],
    specs: ['63g', 'PAW3395', 'PTFE 脚贴', '伞带线材'],
    description: '电竞选手同款轻量化机身，伞带线材几乎零阻力，移动丝滑。'
  },

  // ───────── Audio ─────────
  {
    id: 'au-001',
    slug: 'nexus-pro-headset',
    name: 'NEXUS Pro Headset',
    category: 'audio',
    price: 899,
    rating: 4.7,
    color: '#ff2bd6',
    image: imgProHeadset,
    tags: ['头戴耳机', '游戏', '7.1'],
    specs: ['7.1 虚拟环绕', '50mm 动圈', '可拆卸麦', 'RGB 灯效'],
    description: '7.1 环绕声场精准定位脚步，可拆卸降噪麦让队友听得清楚。'
  },
  {
    id: 'au-002',
    slug: 'nexus-buds-x',
    name: 'NEXUS Buds X',
    category: 'audio',
    price: 499,
    rating: 4.5,
    color: '#cc1faa',
    image: imgBudsX,
    tags: ['真无线', '降噪', '入耳式'],
    specs: ['主动降噪', '蓝牙 5.3', '24h 总续航', '低延迟模式'],
    description: '主动降噪隔绝外界干扰，低延迟模式游戏音画同步不拖后腿。'
  },
  {
    id: 'au-003',
    slug: 'nexus-mic-usb',
    name: 'NEXUS Mic USB',
    category: 'audio',
    price: 399,
    rating: 4.3,
    color: '#a31480',
    image: imgMicUsb,
    tags: ['USB 麦克风', '直播', '心形指向'],
    specs: ['心形指向', '24bit/96kHz', '即插即用', '带防喷罩'],
    description: '直播播客即插即用的 USB 麦，心形指向精准收音，带防喷罩。'
  },

  // ───────── Mousepads ─────────
  {
    id: 'mp-001',
    slug: 'nexus-cloth-xl',
    name: 'NEXUS Cloth XL',
    category: 'mousepads',
    price: 159,
    rating: 4.6,
    color: '#ffb400',
    image: imgClothXl,
    tags: ['布面', '大尺寸', '锁边'],
    specs: ['900×400mm', '3mm 厚度', '防滑橡胶底', '锁边工艺'],
    description: '超大尺寸覆盖整张桌面，密织布面让鼠标操控顺滑稳定。'
  },
  {
    id: 'mp-002',
    slug: 'nexus-glass-pad',
    name: 'NEXUS Glass Pad',
    category: 'mousepads',
    price: 269,
    rating: 4.4,
    color: '#cc8d00',
    image: imgGlassPad,
    tags: ['玻璃', '硬垫', '高速'],
    specs: ['钢化玻璃面', '防滑硅胶底', '320×260mm', '极低阻力'],
    description: '钢化玻璃硬面，极低阻力，喜欢快速甩枪的 FPS 玩家首选。'
  },
  {
    id: 'mp-003',
    slug: 'nexus-desk-mat-pro',
    name: 'NEXUS Desk Mat Pro',
    category: 'mousepads',
    price: 229,
    rating: 4.2,
    color: '#996b00',
    image: imgDeskMatPro,
    tags: ['桌垫', '超大', '防水'],
    specs: ['1200×600mm', 'PU 皮革', '防水易擦', '防滑底'],
    description: '一垫铺满整桌，PU 皮革防水易擦，桌搭玩家的颜值底座。'
  },

  // ───────── Accessories ─────────
  {
    id: 'ac-001',
    slug: 'nexus-wrist-rest',
    name: 'NEXUS Wrist Rest',
    category: 'accessories',
    price: 129,
    rating: 4.5,
    color: '#9b5cff',
    image: imgWristRest,
    tags: ['腕托', '记忆棉', '人体工学'],
    specs: ['记忆棉', '防滑底', '可拆洗面', '多种尺寸'],
    description: '高弹记忆棉托腕减压，长时间键鼠操作也不累手腕。'
  },
  {
    id: 'ac-002',
    slug: 'nexus-cable-comb',
    name: 'NEXUS Cable Comb',
    category: 'accessories',
    price: 59,
    rating: 4.3,
    color: '#7a44d6',
    image: imgCableComb,
    tags: ['理线器', '硅胶', '桌搭'],
    specs: ['硅胶材质', '9 槽位', '可重复粘贴', '多色可选'],
    description: '硅胶理线器把桌下线缆收得干净利落，桌搭爱好者的必备小物。'
  },
  {
    id: 'ac-003',
    slug: 'nexus-monitor-arm',
    name: 'NEXUS Monitor Arm',
    category: 'accessories',
    price: 459,
    rating: 4.6,
    color: '#5e34a8',
    image: imgMonitorArm,
    tags: ['显示器支架', '气弹簧', 'VESA'],
    specs: ['支持 32 英寸', '气弹簧助力', 'VESA 75/100', '走线槽'],
    description: '气弹簧助力轻松升降旋转显示器，释放桌面空间提升坐姿。'
  }
]

// 按 slug 查询单个商品，详情页用
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null
}

// 按分类筛选（不传 category 则返回全部）
export function getProductsByCategory(category) {
  if (!category) return products
  return products.filter((p) => p.category === category)
}
