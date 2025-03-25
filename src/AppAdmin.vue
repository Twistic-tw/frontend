<script setup lang="js">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import './styles.css'
import { ref } from 'vue'
</script>

<template>
    
    <div class="flex h-screen">
        <nav class="flex h-17 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0">
            <div class="flex justify-end flex-1">
                <div @click="ToggleNav" class="rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 size-12 mr-15 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_10px_2px_rgba(255,_255,_255,_0.2)]"></div>
            </div>
        </nav>
        <div @click="ToggleSidenav" class="peer bg-neutral-950 w-21 h-[68px] rounded-tr-3xl flex text-3xl items-center justify-center transition-all duration-200 ease-in-out hover:text-4xl hover:shadow-[13px_16px_0px_1px_rgba(0,_0,_0,_0.5)] fixed top-0">
                <p class="text-white ">TW</p>
            </div>
        <div class="flex overflow-hidden fixed h-full mt-[68px] shadow-none transition-all duration-200 ease-in-out peer-hover:shadow-[13px_18px_0px_1px_rgba(0,_0,_0,_0.5)] w-21" :class="{'w-54 rounded-tr-3xl': sideExpanded}" >
            <nav class="flex-1 w-19 flex-shrink-0 overflow-y-auto bg-gradient-to-b from-neutral-950 to-slate-800 p-3 ">
                <RouterLink to="/" class="relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" :class="{'w-48': sideExpanded}" active-class="bg-slate-900">
                    <svg class="w-9" fill="#ffffff" viewBox="-4.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>home</title> <path class="w-20" d="M19.469 12.594l3.625 3.313c0.438 0.406 0.313 0.719-0.281 0.719h-2.719v8.656c0 0.594-0.5 1.125-1.094 1.125h-4.719v-6.063c0-0.594-0.531-1.125-1.125-1.125h-2.969c-0.594 0-1.125 0.531-1.125 1.125v6.063h-4.719c-0.594 0-1.125-0.531-1.125-1.125v-8.656h-2.688c-0.594 0-0.719-0.313-0.281-0.719l10.594-9.625c0.438-0.406 1.188-0.406 1.656 0l2.406 2.156v-1.719c0-0.594 0.531-1.125 1.125-1.125h2.344c0.594 0 1.094 0.531 1.094 1.125v5.875z"></path> </g></svg>
                    <span class="px-2 text-white text-2xl ml-4" :class="{'hidden': !sideExpanded}">Home</span>
                </RouterLink>
                <RouterLink to="/pdf" class="relative mb-2 flex p-3 hover:bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-4xl items-center" :class="{'w-48': sideExpanded}" active-class="bg-slate-900">
                    <svg class="w-9 min-w-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <span class="px-2 text-white text-2xl ml-4 text-center" :class="{'hidden': !sideExpanded}">Create Templates</span>
                </RouterLink>
            </nav>
        </div>
        <div class="w-48 h-[0px] bg-neutral-950 rounded-b-2xl transition-all duration-200 ease-in-out fixed right-0 mt-[68px]" :class="{'h-[300px]': navExpanded}"></div>
        <div class="flex grow">
            <RouterView/><br>
        </div>
    </div>
</template>


<script lang="js">
const sideExpanded = ref(false);

 const ToggleSidenav = () => {
    sideExpanded.value = !sideExpanded.value
 }

 const navExpanded = ref(false);

 const ToggleNav = () => {
    navExpanded.value = !navExpanded.value
    console.log(navExpanded.value)
 }
</script>
