<script setup lang="ts">

</script>

<template>
  <div class="buy-it" />
</template>

<style scoped>
.buy-it {
  position: fixed;
  inset-inline-end: -58px;
  top: 50%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 70px;
  overflow: hidden;
  border-radius: 5px 0 0 5px;
  transform: translateY(-50%);
  transition: inset-inline-end 0.3s;
}
</style>
