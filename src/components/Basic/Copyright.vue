<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'text-gray',
  },
})
</script>

<template>
  <div class="text-center text-sm" :class="props.color">
    版权所有：高歌数字
  </div>
</template>
