<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import '../styles.css'
import { ref } from 'vue'

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
                <RouterLink to="/pdf" class="relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" :class="{'w-48': sideExpanded}" active-class="bg-slate-900">
                    <svg class="w-9 min-w-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <span class="px-2 text-white text-2xl ml-2 text-center" :class="{'hidden': !sideExpanded}">Make PDF</span>
                </RouterLink>
                <RouterLink to="/" class="relative mb-2 flex p-3 hover:bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-4xl items-center" :class="{'w-48': sideExpanded}" active-class="bg-slate-900">
                    <svg class="w-9 min-w-9" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M61.8,29.4l8.9,8.9l0,0c2,1.9,2,5.1,0,7l0,0L47.5,68.4V36.6l7.2-7.2C56.6,27.4,59.9,27.4,61.8,29.4z M80,62.5V75c0,2.8-2.2,5-5,5H43.8l22.5-22.5H75C77.8,57.5,80,59.8,80,62.5z M20,68.8V25c0-2.8,2.2-5,5-5h12.5c2.8,0,5,2.2,5,5v43.8 c0,6.2-5,11.2-11.2,11.2S20,75,20,68.8z M31.2,73.8c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5S28.5,73.8,31.2,73.8z"></path> </g></svg>
                    <span class="px-2 text-white text-2xl ml-2 text-center" :class="{'hidden': !sideExpanded}">Catalogues</span>
                </RouterLink>
                <RouterLink to="/templates" class="relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" :class="{'w-48': sideExpanded}" active-class="bg-slate-900">
                    <svg class="w-9 min-w-9" fill="#000000" viewBox="0 0 24 24" id="file-code-3" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline id="secondary" points="19 21 21 19 19 17" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline><polyline id="secondary-2" data-name="secondary" points="15 17 13 19 15 21" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline><path id="secondary-3" data-name="secondary" d="M7,13h6M7,9h6" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><path id="primary" d="M9,21H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H15l2,2v8" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><polygon id="primary-2" data-name="primary" points="15 3 15 5 17 5 15 3" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polygon></g></svg>
                    <span class="px-2 text-white text-2xl ml-2 text-center" :class="{'hidden': !sideExpanded}">Templates</span>
                </RouterLink>
            </nav>
        </div>
        <div class="w-46 bg-neutral-950 rounded-b-2xl transition-all delay-0 ease-in-out fixed right-0 mt-[68px] flex flex-col border dark:border-neutral-800 border-t-0 z-50" :class="{'h-[0px] delay-150 duration-650 border-b-0': !navExpanded}, {'h-[244px] delay-0 duration-500': navExpanded}">
            <RouterLink to="/login" class="transition-opacity text-white text-center p-4 text-xl hover:bg-slate-900" active-class="bg-slate-800" :class="{'opacity-0 delay-300': !navExpanded}, {'h-[244px] delay-30': navExpanded}">Profile</RouterLink>
            <RouterLink to="/notifications" class="transition-opacity text-white text-center p-4 text-xl hover:bg-slate-900" active-class="bg-slate-800" :class="{'opacity-0 delay-200': !navExpanded}, {'h-[244px] delay-150': navExpanded}">Notifications</RouterLink>
            <RouterLink to="/login" class="transition-opacity  text-white text-center p-4 text-xl hover:bg-slate-900" active-class="bg-slate-800" :class="{'opacity-0 delay-100': !navExpanded}, {'h-[244px] delay-300': navExpanded}">Configuration</RouterLink>
            <RouterLink to="/login" class="rounded-b-2xl transition-opacity text-white text-center p-4 pb-5 text-xl hover:bg-slate-900 z-2" active-class="bg-slate-800" :class="{'opacity-0 delay-0': !navExpanded}, {'h-[244px] delay-450': navExpanded}">Log Out</RouterLink>
        </div>
        <div class="flex grow">
            <RouterView/><br>
        </div>
    </div>
</template>

