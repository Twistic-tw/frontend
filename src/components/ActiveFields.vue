<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <!-- Header clicable -->
    <div
      class="p-4 cursor-pointer flex justify-between items-center"
      @click="$emit('toggle', cardId)"
    >
      <h2 class="text-xl font-bold text-gray-800">Active Fields</h2>
      <svg
        :class="{ 'rotate-180': isOpen }"
        class="w-5 h-5 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Contenido colapsable -->
    <transition name="expand">
      <div v-show="isOpen" class="p-4 border-t border-gray-100">
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
    </transition>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  fields: { name: string; active: boolean }[],
  cardId: string,
  activeCard: string | null
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
