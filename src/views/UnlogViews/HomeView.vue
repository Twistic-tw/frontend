<script setup lang="ts">
import '../../styles.css'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-100 to-slate-300 px-4 sm:px-6 md:px-8 space-y-32 pt-16 scroll-smooth">

    <!-- Header Section -->
    <section class="text-center animate-fadeInUp space-y-6">
      <h1 class="text-4xl md:text-6xl font-bold text-slate-800 tracking-tight transition duration-300">
        Welcome to <span class="text-indigo-600">TWISTIC</span> Catalogues
      </h1>
      <p class="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Build beautiful pdf catalogues from your spreadsheet      </p>
    </section>

    <!-- How It Works - Horizontal layout with text left and image right -->
    <section class="max-w-6xl mx-auto animate-fadeInUp delay-100 space-y-20 px-4">
      <!-- Step 1 -->
      <div class="flex flex-col-reverse md:flex-row items-center gap-10">
        <div class="md:w-1/2 text-center md:text-left">
          <h3 class="text-2xl font-semibold text-slate-800 mb-3">1. Upload your Excel</h3>
          <p class="text-slate-600 text-base leading-relaxed">
            Import your spreadsheet and let our smart engine analyze and extract all the important fields. The process is smooth, guided, and beginner-friendly.
          </p>
        </div>
        <div class="md:w-1/2">
          <img src="/public/start.png" alt="Upload Excel" class="rounded-xl shadow-lg w-full" />
        </div>
      </div>

      <!-- Step 2 -->
      <div class="flex flex-col-reverse md:flex-row items-center gap-10">
        <div class="md:w-1/2 text-center md:text-left">
          <h3 class="text-2xl font-semibold text-slate-800 mb-3">2. Select and organize fields</h3>
          <p class="text-slate-600 text-base leading-relaxed">
            Choose which fields to keep, select which one you want to display and reorder with a simple drag-and-drop system. Your data, your rules.
          </p>
        </div>
        <div class="md:w-1/2">
          <img src="/public/fields.png" alt="Select Fields" class="rounded-xl shadow-lg w-full" />
        </div>
      </div>

      <!-- Step 3 -->
      <div class="flex flex-col-reverse md:flex-row items-center gap-10">
        <div class="md:w-1/2 text-center md:text-left">
          <h3 class="text-2xl font-semibold text-slate-800 mb-3">3. Generate your PDF</h3>
          <p class="text-slate-600 text-base leading-relaxed">
            Add your logo, colors and images. Download your ready-to-share pdf catalogue as a polished, professional PDF.
          </p>
        </div>
        <div class="md:w-1/2">
          <img src="/public/ready.png" alt="Generate PDF" class="rounded-xl shadow-lg w-full" />
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeInUp delay-200">
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-2xl">
        <h2 class="text-xl font-bold text-slate-800 mb-2">Fast & Smart</h2>
        <p class="text-slate-600">No complex steps. Just upload, customize, and download.</p>
      </div>
      <!--
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-2xl">
        <h2 class="text-xl font-bold text-slate-800 mb-2">Live Notifications</h2>
        <p class="text-slate-600">Track your requests in real-time with admin updates.</p>
      </div>
      -->
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-2xl">
        <h2 class="text-xl font-bold text-slate-800 mb-2">Brand-Ready Templates</h2>
        <p class="text-slate-600">Stay consistent with your branding across catalogues.</p>
      </div>
    </section>

    <!-- Call To Action -->
    <section class="text-center animate-fadeInUp delay-300">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Ready to get started?</h2>
      <RouterLink
        to="/contact"
        class="inline-block px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 mb-6"
      >
        Contact us!
      </RouterLink>
    </section>
  </div>
</template>
