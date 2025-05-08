<script setup lang="ts">
import { RouterLink } from 'vue-router'
import '../styles.css'
</script>

<template>
    <div class="flex h-auto dark:bg-neutral-950 z-50">
        <nav class="flex h-15 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0">
            <div class="flex justify-end flex-1">
                <RouterLink to="/login" class="mx-2 px-10 py-2 text-center text-lg font-semibold tracking-tight rounded-2xl transition duration-200 ease-in-out text-white hover:bg-slate-800" active-class="bg-slate-900">Login</RouterLink>
            </div>
        </nav>
        <router-link to="/" class="flex items-center space-x-2">
          <img src="/public/TW_LOGO_NEGRO_Mesa_de_trabajo_1.png" alt="Twistic Logo" class="h-[6.5rem] w-auto" />
        </router-link>
    </div>
</template>

<style>
.page-enter-from,
.page-leave-to{
    opacity: 0;
}

.page-enter-active,
.page-leave-active{
    transition: opacity 0.6s ease-out;
}
</style>
