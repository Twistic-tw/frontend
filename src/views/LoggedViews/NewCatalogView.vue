<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import draggable from 'vuedraggable'
import { NewCatalog } from '../../composable/NewCatalog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const {
  role,
  step,
  loading,
  form,
  nextStep,
  prevStep,
  handleFileUpload,
  analyzeExcel,
  submitForm,
  resetForm,
  goToDashboard,
  goToTemplateChoice
} = NewCatalog()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
    <div class="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl relative">

      <!-- Progress Bar -->
      <div class="mb-6" v-if="step <= 6">
        <div class="flex justify-between mb-2">
          <span>{{ t('catalog_step', { current: step }) }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" :style="{ width: (step / 6) * 100 + '%' }"></div>
        </div>
      </div>

      <!-- Transition for steps -->
      <transition name="fade-slide" mode="out-in">
        <div :key="step">

          <!-- Step 1 -->
          <div v-if="step === 1">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
              {{ t('step1_title') }}
            </h2>
            <input v-model="form.catalog_name" class="w-full p-3 border rounded-xl" :placeholder="t('step1_placeholder')" />
            <div class="flex justify-end mt-6">
              <button @click="nextStep" :disabled="!form.catalog_name.trim()"
                class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {{ t('step1_next') }}
              </button>
            </div>
          </div>

          <!-- Step 2 -->
          <div v-else-if="step === 2">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"></path></svg>
              {{ t('step2_title') }}
            </h2>
            <input type="file" @change="handleFileUpload" class="w-full p-3 border rounded-xl" />
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">
                {{ t('step2_back') }}
              </button>
              <button @click="analyzeExcel" :disabled="!form.excel_file" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">
                {{ t('step2_analyze') }}
              </button>
            </div>
          </div>

          <!-- Step 3 -->
          <div v-else-if="step === 3" class="bg-white p-6 rounded shadow">
            <h3 class="text-lg font-bold mb-4 text-center">{{ t('step3_title') }}</h3>
            <draggable v-model="form.selected_headers" item-key="name" class="bg-gray-50 p-4 rounded shadow space-y-2" animation="200" ghost-class="ghost" chosen-class="chosen" drag-class="drag">
              <template #item="{ element, index }">
                <div class="p-3 bg-gray-100 rounded cursor-move flex items-center justify-between transition-all duration-200">
                  <div class="flex items-center">
                    <span class="font-semibold text-gray-700 mr-2">{{ index + 1 }}.</span>
                    <span class="text-gray-900">{{ element.name }}</span>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="element.active" class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-200"></div>
                    <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all duration-200"></div>
                  </label>
                </div>
              </template>
            </draggable>
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                {{ t('step3_back') }}
              </button>
              <button @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {{ t('step3_next') }}
              </button>
            </div>
          </div>

          <!-- Step 4 -->
          <div v-if="step === 4">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-pink-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {{ t('step4_title') }}
            </h2>
            <textarea v-model="form.message" class="w-full p-3 border rounded-xl" rows="3" :placeholder="t('step4_placeholder')"></textarea>
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">
                {{ t('step4_back') }}
              </button>
              <button @click="nextStep" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">
                {{ t('step4_next') }}
              </button>
            </div>
          </div>

          <!-- Step 5 -->
          <div v-else-if="step === 5">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"></path></svg>
              {{ t('step5_title') }}
            </h2>

            <div class="mb-4">
              <p><strong>{{ t('step5_catalog') }}</strong> {{ form.catalog_name }}</p>
              <p><strong>{{ t('step5_fields') }}</strong></p>
              <ul class="list-disc list-inside ml-4">
                <li v-for="header in form.selected_headers.filter((h) => h.active)" :key="header.name">
                  {{ header.name }}
                </li>
              </ul>
              <p class="mt-2"><strong>{{ t('step5_message') }}</strong> {{ form.message }}</p>
            </div>

            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">
                {{ t('step5_back') }}
              </button>
              <button @click="submitForm" class="bg-green-500 text-white px-6 py-2 rounded-xl shadow hover:bg-green-600 transition">
                {{ t('step5_confirm') }}
              </button>
            </div>
          </div>

          <!-- Step 6 -->
          <div v-else-if="step === 6">
            <h2 class="text-3xl font-bold mb-4 text-green-600">{{ t('step6_title') }}</h2>
            <p class="mb-6">{{ t('step6_message') }}</p>
            <div class="flex justify-center space-x-4">
              <button @click="resetForm" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">
                {{ t('step6_another') }}
              </button>
              <button @click="goToDashboard" class="bg-gray-600 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-700 transition">
                {{ t('step6_dashboard') }}
              </button>
              <button v-if="role && role === 'admin'" @click="goToTemplateChoice" class="bg-gray-600 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-700 transition">
                {{ t('step6_template') }}
              </button>
            </div>
          </div>

          <!-- Loader -->
          <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div class="text-white text-lg font-semibold flex items-center gap-3">
              <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              {{ t('loading_analyzing') }}
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="mt-12">
      <BackButton class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6" />
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.ghost {
  opacity: 0.4;
}

.chosen {
  background: #cbd5e1;
}

.drag {
  transition: all 0.2s ease;
  transform: scale(1.05);
}
</style>
