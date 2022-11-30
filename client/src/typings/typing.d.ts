declare module '*.vue' {
  import type { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
declare interface Window {
  $loadingBar: InstanceType<typeof import('@/components/loadingBar.vue')>
}

declare module 'md5'
