<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
</script>

<template>
  <div class="loading fixed bottom-5 left-1/2 transform -translate-x-1/2 transition-opacity duration-300" :class="{'opacity-0': !isLoading, 'opacity-100': isLoading}">
    <div class="loading-circle w-8 h-8 border-4 border-gray-800 border-t-indigo-500 rounded-full animate-spin"></div>
  </div>
</template>


<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>