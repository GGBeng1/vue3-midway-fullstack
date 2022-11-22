declare module '*.vue' {
  import type { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
interface LoadingBar {
  start: () => Promise<void>
  finish: () => void
}
declare interface Window {
  $loadingBar: LoadingBar
}

declare module 'md5'
