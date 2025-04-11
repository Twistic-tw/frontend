<script setup lang="ts">
import '../../styles.css'
import ColorPicker from '../../components/ColorPicker.vue'
</script>

<template>
    <div class="flex flex-1 mt-[60px] ml-21 px-6 py-12 lg:px-8 bg-blue-50 dark:bg-zinc-950">
        <form class="flex" action="">
            <div class="flex flex-col w-110 h-full">
                <div class="flex flex-col p-5 justify-evenly rounded-3xl ml-10 my-6 h-1/3 shadow-[0px_5px_3px_4px_rgba(0,_0,_100,_0.2)] transition-all duration-300 ease-in-out hover:mb-10 hover:mt-2 hover:shadow-[0px_21px_3px_4px_rgba(0,_0,_100,_0.2)] dark:shadow-[0px_5px_3px_4px_rgba(200,_200,_250,_0.15)] dark:hover:shadow-[0px_21px_3px_4px_rgba(200,_200,_250,_0.15)]">
                    <label for="excel" class="font-bold text-slate-800 dark:text-slate-300">Seleccione el excel</label>
                    <input type="file" id="excel" name="excel" class="file:bg-slate-300 file:p-1 file:cursor-pointer text-sm text-gray-900 cursor-pointer bg-white border-solid border-2 border-slate-300 rounded-md dark:bg-slate-700 dark:text-slate-400 dark:file:bg-slate-900 dark:border-slate-900">
                    <label for="template" class="font-bold text-slate-800 dark:text-slate-300">Seleccione la plantilla</label>
                    <select name="template" id="template" class="border-slate-400 border-2 rounded-md p-1 dark:border-slate-800 dark:text-slate-500">
                        <option value="1">Plantilla 1</option>
                        <option value="2">Plantilla 2</option>
                        <option value="3">Plantilla 3</option>
                    </select>
                </div>
                <div class="flex flex-col p-5 justify-evenly rounded-3xl ml-10 my-6 h-1/3 shadow-[0px_5px_3px_4px_rgba(0,_0,_100,_0.2)] transition-all duration-300 ease-in-out hover:mb-10 hover:mt-2 hover:shadow-[0px_21px_3px_4px_rgba(0,_0,_100,_0.2)] dark:shadow-[0px_5px_3px_4px_rgba(200,_200,_250,_0.15)] dark:hover:shadow-[0px_21px_3px_4px_rgba(200,_200,_250,_0.15)]">
                    <label for="logo" class="font-bold text-slate-800 dark:text-slate-300">Suba el logo</label>
                    <input type="file" id="excel" name="excel" class="file:bg-slate-300 file:p-1 file:cursor-pointer text-sm text-gray-900 cursor-pointer bg-white border-solid border-2 border-slate-300 rounded-md dark:bg-slate-700 dark:text-slate-400 dark:file:bg-slate-900 dark:border-slate-900">
                    <label for="image" class="font-bold text-slate-800 dark:text-slate-300">Suba el fondo de la portada</label>
                    <input type="file" id="excel" name="excel" class="file:bg-slate-300 file:p-1 file:cursor-pointer text-sm text-gray-900 cursor-pointer bg-white border-solid border-2 border-slate-300 rounded-md dark:bg-slate-700 dark:text-slate-400 dark:file:bg-slate-900 dark:border-slate-900">
                </div>
                <div class="flex p-5 justify-evenly rounded-3xl ml-10 my-6 h-1/3 shadow-[0px_5px_3px_4px_rgba(0,_0,_100,_0.2)] transition-all duration-300 ease-in-out hover:mb-10 hover:mt-2 hover:shadow-[0px_21px_3px_4px_rgba(0,_0,_100,_0.2)] dark:shadow-[0px_5px_3px_4px_rgba(200,_200,_250,_0.15)] dark:hover:shadow-[0px_21px_3px_4px_rgba(200,_200,_250,_0.15)]">
                    <div class="flex flex-col m-auto">
                        <label for="primarycol" class="font-bold text-slate-800 dark:text-slate-300">Elija el color principal</label>
                        <ColorPicker/>
                    </div>
                    <div class="flex flex-col m-auto">
                        <label for="primarycol" class="font-bold text-slate-800 dark:text-slate-300">Elija el color secundario</label>
                        <ColorPicker/>
                    </div>
                </div>
            </div>
            <div class="flex w-150 h-full">
                <div class="rounded-2xl my-6 mx-10 w-full shadow-[0px_5px_3px_4px_rgba(0,_0,_100,_0.2)] transition-all duration-300 ease-in-out hover:mb-10 hover:mt-2 hover:shadow-[0px_21px_3px_4px_rgba(0,_0,_100,_0.2)] dark:shadow-[0px_5px_3px_4px_rgba(200,_200,_250,_0.15)] dark:hover:shadow-[0px_21px_3px_4px_rgba(200,_200,_250,_0.15)]">
                <p class="text-2xl">Aquí estarían los diferentes campos de la plantilla que el usuario podría seleccionar para incluirlos o no en las tables del PDF</p>
                </div>
            </div>
        </form>
        <div class="flex flex-1 h-full">
            <div class="flex items-center flex-1 justify-center rounded-2xl my-6 mr-10 w-full bg-white border-slate-300 dark:bg-zinc-900 dark:border-slate-800 border-3">
                <p class="text-2xl">Aquí habría una preview del PDF</p>
            </div>
        </div>
    </div>
</template>