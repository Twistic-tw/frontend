<template>
  <div
    class="bg-white p-4 rounded-2xl shadow-md mb-6 cursor-pointer hover:shadow-lg transition"
    @click="$emit('open')"
  >
    <h2 class="text-xl font-bold text-gray-800">
      {{ $t('style_presets_title') }}
    </h2>

    <!-- Modal -->
     <transition name="fade">
    <StylePresetsModal
      v-if="isActive"
      :title-settings="titleSettings"
      :header-style="headerStyle"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :footer-style="footerStyle"
      :colors="colors"
      :presets="presets"
      @close="$emit('close')"
    />
    </transition>
  </div>

</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import StylePresetsModal from './StylePresetsModal.vue'

defineProps<{
  isActive: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleSettings: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footerStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presets: any[]
}>()

defineEmits(['open', 'close'])
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
