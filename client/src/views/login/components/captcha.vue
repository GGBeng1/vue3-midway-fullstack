<template>
  <div class="captcha" @click="refresh">
    <img class="base64" :src="props.base64" alt="" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  base64: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['refresh'])
const refresh = () => {
  emit('refresh')
}
</script>

<style lang="scss" scoped>
.captcha {
  height: 40px;
  width: 150px;
  cursor: pointer;

  .svg {
    height: 100%;
    position: relative;
  }

  .base64 {
    height: 100%;
  }
}
</style>
