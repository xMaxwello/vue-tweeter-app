<script setup lang="ts">

</script>

<template>
  <div class="sidebar text-white w-64 h-screen space-y-6 py-7 pl-2 sticky inset-y-0 left-0 transform transition duration-200 ease-in-out border-r-2 border-gray-500">
    <router-link to="/" class="text-white flex items-center space-x-2 px-4">
      <img src="../assets/Logoreanmo.svg" alt="Reanmo">
    </router-link>

    <nav>
      <router-link to="/" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Home</router-link>
      <router-link to="" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Meine Beiträge</router-link>
      <router-link to="" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Einstellungen</router-link>
      <router-link to="login" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Abmelden</router-link>
    </nav>
  </div>
</template>