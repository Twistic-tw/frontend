<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import '../styles.css'
//import { ref } from 'vue'
</script>

<template>
    <div class="flex h-screen dark:bg-neutral-950">
        <nav class="flex h-15 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0">
            <div class="flex justify-end flex-1">
                <RouterLink to="/login" class="mx-2 px-10 py-2 text-center text-lg font-semibold tracking-tight rounded-2xl transition duration-200 ease-in-out text-white hover:bg-slate-800" active-class="bg-slate-900">Login</RouterLink>
                <RouterLink to="/signup" class="mx-2 px-10 py-2 text-center text-lg font-semibold tracking-tight rounded-2xl transition duration-200 ease-in-out text-white hover:bg-slate-800" active-class="bg-slate-900">Signup</RouterLink>
            </div>
        </nav>
        <RouterLink to="/" class="peer bg-white dark:bg-neutral-950 w-[200px] h-[60px] rounded-tr-3xl flex text-4xl items-center justify-center transition-all duration-200 ease-in-out fixed top-0">
                <p class="text-neutral-950 dark:text-white ">TWISTIC</p>
            </RouterLink>
        <div class="flex grow">
            <RouterView v-slot="{ Component }">
                <transition name="page" mode="out-in">
                    <component :is="Component"/>
                </transition>
            </RouterView><br>
        </div>
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

<script lang="ts">
/*
const sideExpanded = ref(false);

 const ToggleSidenav = () => {
    sideExpanded.value = !sideExpanded.value
    console.log(sideExpanded.value)
 }
    */
</script>
