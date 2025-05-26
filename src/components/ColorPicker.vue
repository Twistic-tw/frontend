<template>
    <div class="flex flex-col">
        <ColorPicker v-model="colorHEX" inputId="cp-hex" format="hex" class="rounded-2xl" />
        <span class="font-medium flex-col">{{ colorHEX }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ColorPicker from 'primevue/colorpicker';

const colorHEX = ref('6466f1');
</script>
