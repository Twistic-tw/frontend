<template>
  <transition name="fade-scale">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-[95%] max-w-2xl rounded-xl shadow-xl p-6 overflow-auto relative">
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-4">{{ $t('title_text_catalog') }}</h2>

        <div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('short_label') }}</label>
  <textarea
    type="text"
    :value="modelValue.short"
    @input="e => emit('update:modelValue', { ...modelValue, short: (e.target as HTMLInputElement).value })"
    class="w-full border rounded px-3 py-2 shadow-sm"
    :placeholder="$t('short_placeholder')"
  />
</div>

<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('long_label') }}</label>
  <textarea
    :value="modelValue.long"
    @input="e => emit('update:modelValue', { ...modelValue, long: (e.target as HTMLInputElement).value })"
    rows="4"
    class="w-full border rounded px-3 py-2 shadow-sm"
    :placeholder="$t('long_placeholder')"
  />
</div>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('footer_label') }}</label>
  <input
    type="text"
    :value="modelValue.footer"
    @input="e => emit('update:modelValue', { ...modelValue, footer: (e.target as HTMLInputElement).value })"
    class="w-full border rounded px-3 py-2 shadow-sm"
    :placeholder="$t('footer_placeholder')"
  />
</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  show: boolean
  modelValue: {
    short: string
    long: string
    footer: string
  }
}>()

const emit = defineEmits(['close', 'update:modelValue'])
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
