<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authenticateUser, getCsrfCookie } from "../api/apiLogin";

const router = useRouter();
const email = ref('admin@reanmo.com');
const password = ref('password');
const authErr = ref();

onMounted(() => {
  getCsrfCookie();
});

const login = async () => {
  try {
    const isAuthenticated = await authenticateUser(email.value, password.value);
    if (isAuthenticated) {
      await router.push("home");
    } else {
      authErr.value = "Login fehlgeschlagen";
    }
  } catch (error) {
    authErr.value = error.message;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-center justify-center bg-main bg-opacity-50 w-[420px] h-[502px] rounded-lg space-y-4 py-10 px-4">
      <img class="mb-6" src="../assets/Logoreanmo_login.svg" alt="Reanmo">
      <input v-model="email" class="w-full h-[52px] text-white px-4 bg-homeCard bg-opacity-5 rounded-md" @keydown.enter="login" type="text" placeholder="Email">
      <input v-model="password" class="w-full h-[52px] text-white px-4 bg-homeCard bg-opacity-5 rounded-md" @keydown.enter="login" type="password" placeholder="Password">
      <button @click="login" class="w-60 h-10 bg-homeCard rounded-md font-semibold">Login</button>
      <p v-if="authErr" class="text-red-500">{{ authErr }}</p>
      <button class="text-gray-400 text-xs">Forgot password?</button>
      <div class="flex flex-row text-xs text-gray-400 justify-between w-full mt-6">
        <p>© reanmo GmbH – 2024</p>
        <p>Impressum</p>
        <p> Datenschutz</p>
      </div>
    </div>
  </div>
</template>
