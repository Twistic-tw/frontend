<template>
  <div
    class="bg-white p-4 rounded-2xl shadow-md mb-6 cursor-pointer hover:shadow-lg transition"
    @click="handleClick"
  >
    <h2 class="text-xl font-bold text-gray-800">
      {{ $t('style_presets_title') }}
    </h2>

    <!-- Modal -->
    <transition name="fade">
      <StylePresetsModal
        v-show="isActive"
        :title-settings="titleSettings"
        :header-style="headerStyle"
        :row-style="rowStyle"
        :cell-style="cellStyle"
        :footer-style="footerStyle"
        :colors="colors"
        :presets="presets"
        @close="handleClose"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import StylePresetsModal from './StylePresetsModal.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
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

const emit = defineEmits(['open', 'close'])

const handleClick = () => {
  if (!props.isActive) {
    emit('open')
  }
}

const handleClose = () => {
  emit('close')
}
</script>
