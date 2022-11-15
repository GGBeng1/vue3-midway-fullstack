<template>
  <Teleport to="body">
    <Transition name="loading" :duration="{ enter: 3000, leave: 800 }" appear>
      <div v-show="started" class="fixed top-0 left-0 right-0 h-0.5 max-w-full">
        <div
          ref="loadingBarRef"
          class="inner h-0.5 bg-[var(--el-color-primary)]"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const loadingBarRef = ref<HTMLElement | null>(null)
const pending = ref(false) // 是否正在进行
const started = ref(false) // 是否已经开始或结束
const start = async (): Promise<void> => {
  if (pending.value || started.value) return
  started.value = true
  await nextTick()
  const el = loadingBarRef.value
  if (!el) return
  el.style.maxWidth = `${0}%`
  void el.offsetWidth
  el.style.maxWidth = `${80}%`
  pending.value = true
}
const finish = (): void => {
  if (!pending.value || !started.value) return
  pending.value = false
  const el = loadingBarRef.value
  if (!el) return
  el.style.maxWidth = '100%'
  void el.offsetWidth
  started.value = false
}
defineExpose({
  start,
  finish,
})
</script>

<style lang="scss" scoped>
.loading-enter-active .inner,
.loading-leave-active .inner {
  transition: max-width 3s linear, opacity 1s linear;
}
.loading-leave-active .inner {
  opacity: 0;
}
</style>
