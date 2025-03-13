<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import './styles.css'
</script>

<template>
    
    <div class="flex h-screen">
        <nav class="flex h-24 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0">
            <div class="flex justify-end flex-1">
                <RouterLink to="/login" class="mx-10 text-center text-2xl/9 font-bold tracking-tight text-white">Login</RouterLink>
                <RouterLink to="/signup" class="mx-10 text-center text-2xl/9 font-bold tracking-tight text-white ">Signup</RouterLink>
            </div>
        </nav>
        <div class="peer bg-neutral-950 w-[104px] h-[96px] rounded-tr-3xl flex text-4xl items-center justify-center transition-all duration-200 ease-in-out hover:text-5xl hover:shadow-[13px_16px_0px_1px_rgba(0,_0,_0,_0.5)] fixed top-0">
                <p class="text-white ">TW</p>
            </div>
        <div class="flex overflow-hidden fixed h-full mt-[96px] shadow-none transition duration-200 ease-in-out peer-hover:shadow-[13px_18px_0px_1px_rgba(0,_0,_0,_0.5)]">
            <nav class="hidden lg:block flex-shrink-0 overflow-y-auto bg-gradient-to-b from-neutral-950 to-slate-800 p-3 ">
                <div class="relative mb-2 w-20 flex space-y-16 flex-col p-3 hover:bg-gradient-to-r from-indigo-600/100 to-cyan-500/100 rounded-4xl">
                    <svg fill="#ffffff" viewBox="-4.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>home</title> <path d="M19.469 12.594l3.625 3.313c0.438 0.406 0.313 0.719-0.281 0.719h-2.719v8.656c0 0.594-0.5 1.125-1.094 1.125h-4.719v-6.063c0-0.594-0.531-1.125-1.125-1.125h-2.969c-0.594 0-1.125 0.531-1.125 1.125v6.063h-4.719c-0.594 0-1.125-0.531-1.125-1.125v-8.656h-2.688c-0.594 0-0.719-0.313-0.281-0.719l10.594-9.625c0.438-0.406 1.188-0.406 1.656 0l2.406 2.156v-1.719c0-0.594 0.531-1.125 1.125-1.125h2.344c0.594 0 1.094 0.531 1.094 1.125v5.875z"></path> </g></svg>
                </div>
                <div class="relative mb-2 w-20 flex space-y-16 flex-col p-3 hover:bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-4xl">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
            </nav>
        </div>
        <div class="flex grow">
            <RouterView/>
        </div>
    </div>
</template>

