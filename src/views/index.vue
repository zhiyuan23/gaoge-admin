<route lang="yaml">
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import Home from './basic_data/index.vue'
</script>

<template>
  <FaPageMain>
    <Home :show-footer="false" />
  </FaPageMain>
</template>
