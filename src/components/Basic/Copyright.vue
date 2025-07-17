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
    版权所有：中国兽医药品监察所
  </div>
</template>
