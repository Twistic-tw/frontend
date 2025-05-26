<template>
  <div>
    <!-- Modal fullscreen -->
    <transition name="fade-scale">
      <div
        v-if="showFullscreen"
        class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      >
        <div class="bg-white w-screen h-screen p-6 overflow-auto relative">
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 text-gray-800 text-3xl font-bold hover:text-black"
          >
            &times;
          </button>

          <div class="flex justify-end mb-4">
            <button
              @click="$emit('close')"
              class="bg-gray-800 text-white text-sm px-5 py-2 rounded-lg shadow hover:bg-gray-900 transition"
            >
              Cerrar vista ampliada
            </button>
          </div>

          <div class="scale-100 origin-top-left">
            <div class="bg-white shadow rounded-lg p-6">
              <!-- Vista renderizada directamente -->
              <div v-for="(chunk, index) in previewRows" :key="index" class="a4-page">
                <!-- Cabecera -->
                <div v-if="images.header" class="mb-4" style="height: 120px;">
                  <img :src="headerUrl" alt="Header" class="w-full object-cover rounded" />
                </div>

                <!-- Tabla -->
                <div class="grid font-medium" :style="headerStyle">
                  <div
                    v-for="(key, i) in activeFieldNames"
                    :key="'header-' + i"
                    class="px-4 py-2 border-b"
                  >
                    {{ key }}
                  </div>
                </div>

                <div
                  v-for="(row, ri) in chunk"
                  :key="'row-' + ri"
                  class="grid"
                  :style="rowStyle(ri)"
                >
                  <div
                    v-for="(key, i) in activeFieldNames"
                    :key="'cell-' + ri + '-' + i"
                    class="px-4 py-2"
                  >
                    {{ row[key] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  previewRows: Record<string, string>[][]
  activeFieldNames: string[]
  headerStyle: Record<string, string>
  rowStyle: (index: number) => Record<string, string>
  images: {
    header: File | null
  }
  headerUrl: string
  show: boolean
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'close'): void
}>()

const showFullscreen = ref(false)

watch(() => props.show, (value) => {
  showFullscreen.value = value
})
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
.a4-page {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}
</style>
