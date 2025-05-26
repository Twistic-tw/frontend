<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <h2
      class="text-2xl font-bold text-gray-800 p-6 border-b border-gray-100 cursor-pointer"
      @click="$emit('toggle', cardId)"
    >
      Images
    </h2>
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
import { defineProps } from 'vue'

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
