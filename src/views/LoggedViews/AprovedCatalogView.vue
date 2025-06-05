<script setup lang="ts">
import { ApprovedCatalog } from '../../composable/ApprovedCatalog'

const { approvedTemplates } = ApprovedCatalog()
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Render simple de templates</h1>
    <div v-for="t in approvedTemplates" :key="t.id_template" class="p-2 border-b border-gray-300">
      {{ t.catalog_name }}
    </div>
    <router-link to="/dashboard" class="text-blue-500 underline mt-4 block">Ir a Dashboard</router-link>
  </div>
</template>
