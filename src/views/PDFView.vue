<script setup lang="ts">
  import '../styles.css'

</script>

<template>
  <div class="flex flex-1 mt-[96px] ml-[104px] px-6 py-12 lg:px-8 dark:bg-gray-800">
    <form class="flex items-start" action="submit">
        <div class="text-center mx-3"> 
            <h2>Primer color</h2>
            <input  type="color" id="colorInput1" value="#ff0000">
            <p>HEX:</p> 
            <input class="text-center" type="text" value="#ff0000">
        </div>
        <div class="text-center mx-3"> 
            <h2>Segundo color</h2>
            <input  type="color" id="colorInput2" value="#ff0000">
            <p>HEX:</p> 
            <input class="text-center" type="text" value="#ff0000">
        </div>
        <div class="text-center mx-3"> 
            <h2>Sube tu logo</h2>
            <input  type="file" id="logofile" accept=".png, .jpge, .svg, .jpg" class="file:bg-slate-300 file:p-1 file:cursor-pointer text-sm text-gray-900 cursor-pointer bg-white border-solid border-2 border-slate-300 rounded-sm ">
        </div>
        <div class="text-center mx-3">
            <h2>Sube el excel</h2>
            <input type="file" id="excelfile" accept=".xls, .xlsx" class="file:bg-slate-300 file:p-1 file:cursor-pointer text-sm text-gray-900 cursor-pointer bg-white border-solid border-2 border-slate-300 rounded-sm ">
        </div>
        <input class="bg-slate-400 p-1 px-3 my-3 rounded-sm" type="submit">
    </form>
  </div>
</template>
