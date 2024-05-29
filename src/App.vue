<script setup lang="ts">

import Sidebar from "./components/sidebar.vue";
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-grow">
      <RouterView />
    </div>
  </div>
</template>


