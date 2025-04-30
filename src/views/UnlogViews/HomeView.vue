<script setup lang="ts">
import '../../styles.css'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-100 to-slate-300 px-4 sm:px-6 md:px-8 space-y-24 mt-14">

    <!-- Block 1: Main Header -->
    <section class="text-center space-y-4 animate-fadeInUp px-2">
      <h1 class="text-4xl md:text-5xl font-extrabold text-slate-800">Welcome to TWISTIC Catalogues</h1>
      <p class="text-lg text-slate-700 max-w-2xl mx-auto mt-4">
        Create beautiful and customized product catalogues from Excel in just a few clicks.
      </p>
    </section>

    <!-- Block 2: How It Works -->
    <section class="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-10 text-center animate-fadeInUp delay-100">
      <div class="flex flex-col items-center">
        <img src="/public/start.png" alt="Upload Excel" class="w-20 h-20 mb-4" />
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">1. Upload your Excel</h3>
        <p class="text-slate-600">Import your data and let the app do the work for you.</p>
      </div>
      <div class="flex flex-col items-center">
        <img src="/public/fields.png" alt="Select Fields" class="w-20 h-20 mb-4" />
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">2. Select and organize fields</h3>
        <p class="text-slate-600">Choose which fields to display and customize their order.</p>
      </div>
      <div class="flex flex-col items-center">
        <img src="/public/ready.png" alt="Generate PDF" class="w-20 h-20 mb-4" />
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">3. Create your custom PDF</h3>
        <p class="text-slate-600">Add styles and branding, then export your catalog in seconds.</p>
      </div>
    </section>

    <!-- Block 3: Benefits -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 animate-fadeInUp delay-200">
      <div class="bg-white p-6 rounded-xl shadow-lg text-center transition hover:shadow-2xl max-w-sm mx-auto">
        <h2 class="text-xl font-semibold text-indigo-600 mb-2">Fast and Easy</h2>
        <p class="text-slate-600 text-base">No more manual formatting. Everything automated.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg text-center transition hover:shadow-2xl max-w-sm mx-auto">
        <h2 class="text-xl font-semibold text-indigo-600 mb-2">Smart Notifications</h2>
        <p class="text-slate-600 text-base">Track every request and approval in real time.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg text-center transition hover:shadow-2xl max-w-sm mx-auto">
        <h2 class="text-xl font-semibold text-indigo-600 mb-2">Custom Templates</h2>
        <p class="text-slate-600 text-base">Design with your company’s look and feel.</p>
      </div>
    </section>

    <!-- Block 4: Call To Action -->
    <section class="text-center animate-fadeInUp delay-300 mb-16">
      <h2 class="text-3xl font-bold mb-4 text-slate-800">Ready to get started?</h2>
      <RouterLink
        to="/signup"
        class="inline-block px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-xl shadow hover:bg-indigo-700 transition"
      >
        Start Now
      </RouterLink>
    </section>
  </div>
</template>


