<template>
  <div class="bg-white p-4 rounded-2xl shadow-md border mb-6 cursor-pointer hover:shadow-lg transition" @click="openModal = true">
    <h2 class="text-lg font-bold text-gray-800">{{ $t('style_presets_title') }}</h2>

    <!-- Modal -->
    <StylePresetsModal
      v-if="openModal"
      @close="openModal = false"
      :titleSettings="titleSettings"
      :headerStyle="headerStyle"
      :rowStyle="rowStyle"
      :cellStyle="cellStyle"
      :footerStyle="footerStyle"
      :colors="colors"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StylePresetsModal from './StylePresetsModal.vue'

const openModal = ref(false)

defineProps<{
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
}>()
</script>
