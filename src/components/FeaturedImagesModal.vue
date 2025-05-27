<template>
  <transition name="fade-scale">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-[95%] max-w-3xl rounded-xl shadow-xl p-6 overflow-auto relative">
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-6">Upload Featured Images</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(file, key) in model" :key="key" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 capitalize">
              {{ key.replace('_', ' ') }}
            </label>
            <input type="file" accept="image/png, image/jpeg" @change="onUpload($event, key)" class="w-full" />
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
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

defineProps<{ show: boolean }>()
defineEmits(['close'])

const toast = useToast()

const model = defineModel<{
  image_one: File | null
  image_two: File | null
  image_three: File | null
  image_four: File | null
}>()

const previews = ref<Record<string, string>>({
  image_one: '',
  image_two: '',
  image_three: '',
  image_four: ''
})

watch(model, () => {
  Object.entries(model.value).forEach(([key, file]) => {
    previews.value[key] = file ? URL.createObjectURL(file) : ''
  })
})

function onUpload(event: Event, key: string) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const maxSizeMB = 2

  if (!validTypes.includes(file.type)) {
    toast.error(`"${file.name}" is not a valid image type. Please use JPG or PNG.`)
    return
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
    toast.error(`"${file.name}" is ${sizeMB}MB. Max allowed: ${maxSizeMB}MB.`)
    return
  }

  model.value[key] = file
  previews.value[key] = URL.createObjectURL(file)
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
