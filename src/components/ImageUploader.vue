<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <h2
      class="text-xl font-bold text-gray-800 p-6 border-b border-gray-100 cursor-pointer"
      @click="$emit('toggle', cardId)"
    >
      Images
    </h2>
    <svg
      :class="{ 'rotate-180': isOpen }"
      class="w-5 h-5 transition-transform"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
    <Transition name="expand">
      <div v-if="activeCard === cardId" class="p-6 pt-0">
        <div class="h-auto flex flex-col gap-4">
          <div v-for="(label, key) in imageLabels" :key="key">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
            <input type="file" @change="(e) => handleUpload(e, key)" class="file-input w-full" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  handleImageUpload: (e: Event, key: string) => void
  activeCard: string | null
  cardId: string
}>()

const handleUpload = (e: Event, key: string) => {
  props.handleImageUpload(e, key)
}

const imageLabels: Record<string, string> = {
  cover: 'Cover (Required)',
  second: 'Second Cover (Optional)',
  header: 'Header (Required)',
  footer: 'Footer (Optional)',
  background: 'Background (Optional)',
}

const isOpen = computed(() => props.activeCard === props.cardId)
</script>

<style scoped>
.file-input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
}

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
