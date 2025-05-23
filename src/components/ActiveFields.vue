<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-4 pb-2">Active Fields</h2>

    <draggable v-model="fields" item-key="name" class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <template #item="{ element }">
        <div class="flex justify-between items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition text-sm">
          <span class="text-gray-700 truncate">{{ element.name }}</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="element.active" class="sr-only peer" />
            <div class="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
            <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
          </label>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { defineProps } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  fields: { name: string; active: boolean }[]
}>()
</script>

<style scoped>
</style>
