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
                    <svg class="w-9 min-w-9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#ffffff" stroke-linejoin="round" stroke-width="2" d="M13 3V10H20M6 7H5C4.44772 7 4 7.44772 4 8V20C4 20.5523 4.44772 21 5 21H14C14.5523 21 15 20.5523 15 20V19M8 4V16C8 16.5523 8.44772 17 9 17H19C19.5523 17 20 16.5523 20 16V9.38898C20 9.13879 19.9062 8.89769 19.7372 8.71326L14.7973 3.32428C14.6078 3.11765 14.3404 3 14.0601 3H9C8.44772 3 8 3.44772 8 4Z"></path> </g></svg>
                    <span class="px-2 text-white text-2xl ml-2 text-center" :class="{'hidden': !sideExpanded}">Template</span>
                </RouterLink>
                <RouterLink to="/allcatalogues" class="relative mb-2 flex p-3 hover:bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-4xl items-center" :class="{'w-48': sideExpanded}" active-class="bg-slate-900">
                    <svg class="w-9 min-w-9" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M61.8,29.4l8.9,8.9l0,0c2,1.9,2,5.1,0,7l0,0L47.5,68.4V36.6l7.2-7.2C56.6,27.4,59.9,27.4,61.8,29.4z M80,62.5V75c0,2.8-2.2,5-5,5H43.8l22.5-22.5H75C77.8,57.5,80,59.8,80,62.5z M20,68.8V25c0-2.8,2.2-5,5-5h12.5c2.8,0,5,2.2,5,5v43.8 c0,6.2-5,11.2-11.2,11.2S20,75,20,68.8z M31.2,73.8c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5S28.5,73.8,31.2,73.8z"></path> </g></svg>
                    <span class="px-2 text-white text-2xl ml-2 text-center" :class="{'hidden': !sideExpanded}">Catalogues</span>
                </RouterLink>
                <RouterLink to="/allusers" class="relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" :class="{'w-48': sideExpanded}" active-class="bg-slate-900">
                    <svg class="w-9 min-w-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <span class="px-2 text-white text-2xl ml-2 text-center" :class="{'hidden': !sideExpanded}">Users</span>
                </RouterLink>
            </nav>
        </div>
        <div class="w-46 h-[0px] bg-neutral-950 rounded-b-2xl transition-all duration-200 ease-in-out fixed right-0 mt-[68px] flex flex-col" :class="{'h-[244px]': navExpanded}">
            <RouterLink to="/pdf" class="transition-all duration-200 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" active-class="bg-slate-800" :class="{'hidden': !navExpanded}">Profile</RouterLink>
            <RouterLink to="/pdf" class="transition-all duration-200 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" active-class="bg-slate-800" :class="{'hidden': !navExpanded}">Notifications</RouterLink>
            <RouterLink to="/pdf" class="transition-all duration-200 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" active-class="bg-slate-800" :class="{'hidden': !navExpanded}">Configuration</RouterLink>
            <RouterLink to="/pdf" class="rounded-b-2xl transition-all duration-200 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" active-class="bg-slate-800" :class="{'hidden': !navExpanded}">Log Out</RouterLink>
        </div>
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
