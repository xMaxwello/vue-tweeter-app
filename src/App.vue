<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/sidebar.vue';

const route = useRoute();

const isLoginRoute = computed(() => {
  return route.path === '/login';
});</script>

<template>
  <div v-if="isLoginRoute" >
    <RouterView />
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 min-h-screen">
    <div class="hidden md:block md:col-span-1">
      <Sidebar/>
    </div>

    <div class="col-span-2">
      <div class="max-w-[751px] mx-auto px-4 w-full">
        <RouterView />
      </div>
    </div>

    <div class="hidden 2xl:block 2xl:col-span-1">
    </div>
  </div>
</template>




