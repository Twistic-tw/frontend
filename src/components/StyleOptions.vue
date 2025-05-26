<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <h2
      class="text-2xl font-bold text-gray-800 p-6 border-b border-gray-100 cursor-pointer"
      @click="$emit('toggle', cardId)"
    >
      Customize Style
    </h2>
    <Transition name="expand">
      <div v-if="activeCard === cardId" class="p-6 pt-0 flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">PDF Background</label>
          <input type="color" v-model="colors.backgroundColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.backgroundAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Primary Row</label>
          <input type="color" v-model="colors.rowPrimaryColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.rowPrimaryAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Alternate Row</label>
          <input type="color" v-model="colors.rowAlternateColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.rowAlternateAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Header Background</label>
          <input type="color" v-model="colors.headerColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.headerAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Header Text</label>
          <input type="color" v-model="colors.headerText" class="w-full h-8 border rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Content Text</label>
          <input type="color" v-model="colors.text" class="w-full h-8 border rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Footer Background</label>
          <input type="color" v-model="colors.footerColor" class="w-full h-8 border rounded mb-1" />
          <input type="range" min="0" max="1" step="0.01" v-model.number="colors.footerAlpha" class="w-full bg-[#1e2939]" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
          <input type="color" v-model="colors.footerText" class="w-full h-8 border rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Show Table Borders</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="colors.showBorders" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
            <div class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
          </label>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Field Font</label>
          <select v-model="titleSettings.fieldFont" class="w-full p-2 border rounded">
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleSettings: any,
  activeCard: string | null,
  cardId: string
}>()
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
