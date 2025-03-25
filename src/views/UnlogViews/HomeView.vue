<script setup lang="ts">
import '../../styles.css'
import { RouterLink} from 'vue-router'
</script>

<template>
    <div class="flex flex-1 mt-[60px] bg-gradient-to-r from-white via-slate-200 to-slate-400 px-6 py-12 lg:px-8 dark:bg-gradient-to-r dark:from-neutral-950 dark:via-none dark:to-slate-900 p-3">
        <div class="p-5 text-center w-[600px] mt-[200px] mb-[205px]">
            <h2 class="text-4xl font-semibold text-slate-800 dark:text-white m-10 mt-0 mb5-1 font-mono">Create simple catalogues with just a few steps</h2>
            <RouterLink to="/login" class="p-3 px-20 text-2xl text-white rounded-2xl transition-all duration-500 ease-in-out bg-slate-500 dark:bg-neutral-600 hover:bg-indigo-700">Log In</RouterLink><br>
            <h2 class="inline-block font-semibold text-slate-800 dark:text-white text-xl mt-5 mb-10 pr-2">or, if you don't have an account,</h2>
            <RouterLink to="/login" class="underline font-semibold transition-all duration-300 ease-in-out text-cyan-700 hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-100 text-xl mt-8 mb-10">Sign Up</RouterLink>
        </div>
        <div class="flex-auto text-center m-10">
            <h1 class="text-8xl text-slate-800 font-bold dark:text-white mt-40 z-4">TWISTIC</h1>
            <div class="flex justify-evenly items-center m-10 text-center mx-15">
                <span class="text-slate-800 font-medium dark:text-white">Authomatic</span>
                <div class="bg-slate-900 w-0.5 h-4 rounded-full inline-block dark:bg-slate-100"></div>
                <span class="text-slate-800 font-medium dark:text-white">Easy</span>
                <div class="bg-slate-900 w-0.5 h-4 rounded-full inline-block dark:bg-slate-100"></div>
                <span class="text-slate-800 font-medium dark:text-white">Customizable</span>
            </div>
        </div>
    </div>
    
</template>