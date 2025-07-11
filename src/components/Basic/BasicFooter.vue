<script setup lang="ts">
const props = defineProps({
  heightAuto: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="footer-auto fixed bottom-0 w-full pb-12 pt-5 text-center text-gray-500"
    :class="[
      props.heightAuto ? 'static' : '',
    ]"
  >
    <div class="text-sm leading-8">
      兽药生产企业数据库友情提示
    </div>
    <div class="text-xs leading-6">
      生产许可证的数据更新截止日期:2025-06-17，GMP证书的数据更新截止日期:2025-06-17<br>
      如发现数据库中的生产许可证数据的问题，请致电:59193265，62103531<br>
      如发现数据库中的GMP证书数据的问题，请致电:62103531
    </div>
  </div>
</template>

<style scpoed>
@media (height <= 1000px) {
  .footer-auto {
    position: static !important;
  }
}
</style>
