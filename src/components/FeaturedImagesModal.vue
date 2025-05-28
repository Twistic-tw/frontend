<template>
  <transition name="fade-scale">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-[95%] max-w-3xl rounded-xl shadow-xl p-6 overflow-auto relative">
        <!-- Botón cerrar -->
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-6">
          {{ t('upload_featured_images') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="key in ['image_one', 'image_two', 'image_three', 'image_four']" :key="key" class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 capitalize">
              {{ formatKey(key) }}
            </label>

            <input
              type="file"
              accept="image/png, image/jpeg"
              @change="onUpload($event, key)"
              class="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            <input
              type="text"
              :placeholder="t('short_description', { image: formatKey(key) })"
              v-model="descriptions[getDescKey(key)]"
              maxlength="60"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            />

            <div v-if="previews[key]" class="rounded overflow-hidden border">
              <img :src="previews[key]" class="w-full h-40 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const toast = useToast()

defineProps<{ show: boolean }>()
defineEmits(['close'])

const images = defineModel('images') as Ref<{
  image_one: File | null
  image_two: File | null
  image_three: File | null
  image_four: File | null
}>

const descriptions = defineModel('descriptions') as Ref<{
  desc_one: string
  desc_two: string
  desc_three: string
  desc_four: string
}>

const previews = ref<Record<string, string>>({
  image_one: '',
  image_two: '',
  image_three: '',
  image_four: ''
})

watch(images, () => {
  Object.entries(images.value).forEach(([key, file]) => {
    previews.value[key] = file ? URL.createObjectURL(file) : ''
  })
})

function onUpload(event: Event, key: string) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const maxSizeMB = 2

  if (!validTypes.includes(file.type)) {
    toast.error(t('toast.invalid_image_type', { file: file.name }))
    return
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
    toast.error(t('toast.image_too_large', { file: file.name, size: sizeMB, max: maxSizeMB }))
    return
  }

  images.value[key] = file
  previews.value[key] = URL.createObjectURL(file)
}

function getDescKey(k: string) {
  return `desc_${k.split('_')[1]}` as keyof typeof descriptions.value
}

function formatKey(k: string) {
  return k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
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
