<template>
  <div>
    <!-- Modal fullscreen -->
    <transition name="fade-scale">
      <div
        v-if="showFullscreen"
        class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      >
        <div
          class="bg-white w-screen h-screen p-6 overflow-auto relative rounded-lg shadow-xl"
          :style="{
            marginTop: '8em',
            maxWidth: '794px',
            maxHeight: 'calc(100vh - 4rem)',
            width: '100%',
            height: 'auto'
          }"
        >
          <!-- Vista completa del catálogo -->
          <div id="pdf-content" class="origin-top-left w-full h-fit-content bg-gray-100">
            <!-- Portada -->
            <div v-if="coverUrl" class="a4-page">
              <img :src="coverUrl" alt="Cover Image" class="a4-image-content no-radius w-full h-full object-cover" />
            </div>

            <!-- Segunda portada -->
            <div v-if="secondUrl" class="a4-page">
              <img :src="secondUrl" alt="Second Cover" class="a4-image-content no-radius w-full h-full object-contain" />
            </div>

            <!-- Páginas de contenido -->
            <div
              v-for="(chunk, index) in previewRows"
              :key="'page-' + index"
              class="a4-page"
              :style="{
                backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                padding: '0'
              }"
            >
              <!-- Cabecera -->
              <div v-if="headerUrl" class="mb-4" style="height: 120px; overflow: hidden">
                <img :src="headerUrl" alt="Header Image" class="w-full object-cover rounded-b-lg" style="height: 120px" />
              </div>

              <!-- Tabla -->
              <div class="w-full h-full text-sm border border-transparent rounded-[8px] shadow-sm p-6 table-preview-shadow" style="padding-bottom: 60px;">
                <div class="grid font-medium" :style="headerStyle">
                  <div
                    v-for="(key, i) in activeFieldNames"
                    :key="'header-' + i"
                    class="px-4 py-2 text-left border-r border-indigo-500 last:border-r-0"
                    style="max-width: 250px; overflow: hidden; text-overflow: ellipsis"
                  >
                    {{ key }}
                  </div>
                </div>

                <div
                  v-for="(row, ri) in chunk"
                  :key="'row-' + index + '-' + ri"
                  class="grid"
                  :style="rowStyle(ri)"
                >
                  <div
                    v-for="(key, i) in activeFieldNames"
                    :key="'cell-' + index + '-' + ri + '-' + i"
                    class="px-4 py-2 last:border-r-0"
                  >
                    {{ row[key] }}
                  </div>
                </div>
              </div>

              <!-- Footer fijo en cada página -->
              <div class="footer-bar absolute bottom-4 right-6 text-sm text-gray-500 italic" :style="footerStyle">
                {{ index + 1 }}
              </div>
            </div>

            <!-- Página extra solo con footer -->
            <div v-if="footerUrl" class="a4-page">
              <div class="a4-image full-a4">
                <img :src="footerUrl" alt="Footer Image" class="a4-image-content no-radius" />
              </div>
            </div>
          </div>

          <!-- Botón flotante abajo -->
          <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button
              @click="$emit('close')"
              class="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition"
              title="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  previewRows: Record<string, string>[][];
  activeFieldNames: string[];
  headerStyle: Record<string, string>;
  footerStyle: Record<string, string>;
  rowStyle: (index: number) => Record<string, string>;
  headerUrl?: string;
  footerUrl?: string;
  coverUrl?: string;
  secondUrl?: string;
  backgroundUrl?: string;
  show: boolean;
}>();

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
  position: relative;
}
.a4-image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
.no-radius {
  border-radius: 0;
}
</style>
