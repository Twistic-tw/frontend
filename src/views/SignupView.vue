<script setup lang="ts">
import '../styles.css'
</script>

<template>
  <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
  <div class="flex-1 mt-[96px] ml-[104px] flex-col justify-center px-6 py-12 lg:px-8">
      <div class="w-120 m-auto p-5 py-20 rounded-3xl shadow-[0px_20px_24px_30px_rgba(0,_0,_0,_0.1)]">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
              <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=emerald&shade=500" alt="Your Company" />
              <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up</h2>
          </div>
  
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST">
                  <div>
                      <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                      <div class="mt-2">
                          <input type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                      </div>
                  </div>
  
                  <div>
                      <div class="flex items-center justify-between">
                          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                          <div class="text-sm">
                              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                          </div>
                      </div>
                      <div class="mt-2">
                          <input type="password" name="password" id="password" autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                      </div>
                  </div>
  
                  <div>
                      <button type="submit" class="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                  </div>
              </form>
  
              <p class="mt-10 text-center text-sm/6 text-gray-500">
                  Not a member? {{ ' ' }}
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
              </p>
          </div>
      </div>
  </div>
</template>



