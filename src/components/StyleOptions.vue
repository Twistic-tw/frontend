<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <!-- Header con icono alineado a la derecha -->
    <div
      class="flex items-center justify-between p-6 border-b border-gray-100 cursor-pointer"
      @click="$emit('toggle', cardId)"
    >
      <h2 class="text-xl font-bold text-gray-800">
        {{ $t('title_styles') }}
      </h2>
      <svg
        :class="{ 'rotate-180': isOpen }"
        class="w-5 h-5 text-gray-600 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Contenido expandible -->
    <Transition name="expand">
      <div v-if="isOpen" class="p-6 flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pdf_background') }}</label>
          <input type="color" v-model="colors.backgroundColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.backgroundAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('title_background_color') }}</label>
          <input type="color" v-model="colors.titleBackground" class="w-full h-10 rounded border shadow-sm" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.titleAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('title_color') }}</label>
          <input type="color" v-model="colors.titleText" class="w-full h-10 rounded border shadow-sm" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('primary_row') }}</label>
          <input type="color" v-model="colors.rowPrimaryColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.rowPrimaryAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('alternate_row') }}</label>
          <input type="color" v-model="colors.rowAlternateColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.rowAlternateAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('header_background') }}</label>
          <input type="color" v-model="colors.headerColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.headerAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('header_text') }}</label>
          <input type="color" v-model="colors.headerText" class="w-full h-8 border rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('short_description_color') }}
          </label>
          <input
            type="color"
            v-model="colors.shortDescriptionColor"
            class="w-full h-8 border rounded"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('long_description_color') }}
          </label>
          <input
            type="color"
            v-model="colors.longDescriptionColor"
            class="w-full h-8 border rounded"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('content_text') }}</label>
          <input type="color" v-model="colors.text" class="w-full h-8 border rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('footer_background') }}</label>
          <input type="color" v-model="colors.footerColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.footerAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('footer_text') }}</label>
          <input type="color" v-model="colors.footerText" class="w-full h-8 border rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('show_borders') }}</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="colors.showBorders" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
            <div class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
          </label>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('field_font') }}</label>
          <select v-model="titleSettings.fieldFont" class="w-full p-2 border rounded">
            <option value="Arial">{{ $t('font_arial') }}</option>
            <option value="Helvetica">{{ $t('font_helvetica') }}</option>
            <option value="Times New Roman">{{ $t('font_times') }}</option>
            <option value="Georgia">{{ $t('font_georgia') }}</option>
            <option value="Courier New">{{ $t('font_courier') }}</option>
          </select>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  colors: {
    backgroundColor?: string
    backgroundAlpha?: number
    titleBackground?: string
    titleAlpha?: number
    titleText?: string
    rowPrimaryColor?: string
    rowPrimaryAlpha?: number
    rowAlternateColor?: string
    rowAlternateAlpha?: number
    headerColor?: string
    headerAlpha?: number
    headerText?: string
    text?: string
    footerColor?: string
    footerAlpha?: number
    footerText?: string
    showBorders?: boolean
    shortDescriptionColor?: string
    longDescriptionColor?: string
  }
  titleSettings: {
    fieldFont?: string
  }
  shortDescription: string
  longDescription: string
  activeCard: string | null
  cardId: string
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'update:shortDescription', value: string): void
  (e: 'update:longDescription', value: string): void
  (e: 'toggle', cardId: string): void
}>()

const isOpen = computed(() => props.activeCard === props.cardId)

</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
