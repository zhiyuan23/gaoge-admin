<script lang="ts" setup>
// import useSettingsStore from '@/store/modules/settings'
// const settingsStore = useSettingsStore()
// const to = computed(() => settingsStore.settings.home.enable ? settingsStore.settings.home.fullPath : '')

const props = defineProps({
  type: {
    type: String,
    default: 'IMAGE_TEXT',
  },
})

const to = computed(() => {
  return { name: 'basicDataIndex' }
})
</script>

<template>
  <div class="sticky top-0 z-10 h-20 flex-center-start bg-primary px-8">
    <RouterLink :to="to" class="h-full flex-center-start cursor-pointer">
      <!-- 图文标题 -->
      <template v-if="props.type === 'IMAGE_TEXT'">
        <img class="mr-3 w-13" src="@/assets/images/logo.png">
        <div class="text-2xl text-white">
          国家兽药基础数据库
        </div>
      </template>
      <!-- 图片标题 -->
      <img v-else class="w-80" src="@/assets/images/logo.png">
    </routerlink>
  </div>
</template>
