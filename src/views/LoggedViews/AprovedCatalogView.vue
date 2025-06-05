<script setup lang="ts">
import { ApprovedCatalog } from '../../composable/ApprovedCatalog'

console.log('Vista createCatalogues montada con composable cargado')
ApprovedCatalog()
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Create Catalogues con composable</h1>
    <router-link to="/dashboard" class="text-blue-500 underline">Ir a Dashboard</router-link>
  </div>
</template>
