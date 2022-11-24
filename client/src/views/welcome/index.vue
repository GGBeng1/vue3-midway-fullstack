<template>
  <div>
    <el-button @click="handler1">handler1</el-button>
    <el-button @click="handler2">handler2</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Welcome',
})

const handler1 = () => {
  window.$loadingBar.start()
}
const handler2 = () => {
  window.$loadingBar.finish()
}
</script>

<style lang="scss" scoped></style>
