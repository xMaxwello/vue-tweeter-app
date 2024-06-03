<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/sidebar.vue';

const route = useRoute();

const isLoginRoute = computed(() => {
  return route.path === '/login';
});</script>

<template>
  <div class="flex">
    <Sidebar v-if="!isLoginRoute" />
    <div class="flex-grow">
      <RouterView />
    </div>
  </div>
</template>


