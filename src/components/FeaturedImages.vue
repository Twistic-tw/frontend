<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Featured Images</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(file, key) in model" :key="key">
        <label class="block text-sm font-medium text-gray-700 mb-1 capitalize">
          {{ key.replace('_', ' ') }}
        </label>
        <input type="file" accept="image/png, image/jpeg" @change="onUpload($event, key)" />
        <div v-if="previews[key]" class="mt-2 rounded overflow-hidden border">
          <img :src="previews[key]" class="w-full h-40 object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

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
    toast.error(`"${file.name}" is not a valid image type. Use JPG or PNG.`)
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
