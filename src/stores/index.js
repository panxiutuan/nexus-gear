import { createPinia } from 'pinia'

// Pinia 实例导出。各 store（cart / favorite / order 等）在对应文件中定义，
// 组件中通过 useXxxStore() 按需调用。
const pinia = createPinia()
export default pinia
