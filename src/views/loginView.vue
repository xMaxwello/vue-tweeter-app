<script setup lang="ts">

</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-center justify-center bg-main bg-opacity-50 w-[420px] h-[502px] rounded-lg space-y-4 py-10 px-4">
      <img class="mb-6" src="../assets/Logoreanmo_login.svg" alt="Reanmo">
      <input class="w-full h-[52px] text-white px-4 bg-homeCard bg-opacity-5 rounded-md" type="text" placeholder="Benutzername">
      <input class="w-full h-[52px] text-white px-4 bg-homeCard bg-opacity-5 rounded-md" type="password" placeholder="Passwort">
      <button class="w-60 h-10 bg-homeCard rounded-md font-semibold">Login</button>
      <button class="text-gray-400 text-xs">Passwort vergessen?</button>
      <div class="flex flex-row text-xs text-gray-400 justify-between w-full mt-6">
        <p>© reanmo GmbH – 2024</p>
        <p>Impressum</p>
        <p> Datenschutz</p>
      </div>
    </div>
  </div>
</template>

