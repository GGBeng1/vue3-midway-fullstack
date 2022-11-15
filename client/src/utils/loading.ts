let loadingCount: number = 0
let loadingInstance: any = null
export function showLoading(text: string | undefined) {
  if (loadingCount === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: text || '加载中',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }
  loadingCount++
}

export function closeLoading() {
  if (loadingCount <= 0) return
  loadingCount--
  if (loadingCount === 0) {
    loadingInstance.close()
  }
}
