<script setup lang="js">
import { RouterLink, RouterView } from 'vue-router'
import NavUnlog from './Navs/NavUnlog.vue'
import NavAdmin from './Navs/NavAdmin.vue'
import NavClient from './Navs/NavClient.vue'
import './styles.css'
import { ref } from 'vue'
</script>

<template>
  <div v-if="role === 'unlogged'">
    <NavUnlog/>
  </div>
  <div v-else-if="role === 'admin'">
    <NavAdmin/>
  </div>
  <div v-else-if="role === 'client'">
    <NavClient/>
  </div>
  <div v-else>
    <p>Hubo un problema con la selección de página</p>
  </div>
</template>


<script lang="js">

    const role = 'client';

</script> 