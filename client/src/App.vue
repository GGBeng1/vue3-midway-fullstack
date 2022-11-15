<script setup lang="ts">
import type LoadingBar from '@/components/loadingBar.vue'

let loading = ref<InstanceType<typeof LoadingBar> | null>(null)
onMounted(() => {
  const loadingBar = loading.value as InstanceType<typeof LoadingBar>
  window.$loadingBar = loadingBar
})
</script>

<template>
  <loading-bar ref="loading"></loading-bar>
  <RouterView />
</template>
