<script setup lang="ts">
import {computed, ref} from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/sidebar.vue';
import bannerComponent from "./components/bannerComponent.vue";

const route = useRoute();

const isLoginRoute = computed(() => {
  return route.path === '/login';
});

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div v-if="isLoginRoute" >
    <RouterView />
  </div>

  <bannerComponent class="block md:hidden" @toggle-sidebar="toggleSidebar"/>
  <div v-show="isSidebarOpen" class="z-10 pr-60 block md:hidden">
    <Sidebar />
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




