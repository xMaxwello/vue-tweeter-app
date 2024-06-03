<script setup lang="ts">

</script>

<template>
  <div class="flex justify-center pt-24">
    <div class="w-2/5 h-screen pt-5 px-5 bg-homeCard bg-opacity-5 rounded-t-[10px]">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-white text-base font-medium">Einstellungen</h1>
      </div>
      <hr class="w-full mt-4 border-white border-opacity-10"/>

      <div class="w-full flex justify-between items-center py-4">
        <div class="w-[40px] h-[40px] flex-none bg-white rounded-full" />
        <button class="text-xs md:text-sm lg:text-base font-semibold text-homeCard">Bild hochladen</button>
      </div>

      <div class="w-full flex justify-between items-center text-white py-2">
        <p>Vorname</p>
        <input class="w-[340px] h-[52px]  px-4 bg-homeCard bg-opacity-5 rounded-md" type="text" placeholder="Vorname">
      </div>

      <div class="w-full flex justify-between items-center text-white py-2">
        <p>Nachname</p>
        <input class="w-[340px] h-[52px] px-4 bg-homeCard bg-opacity-5 rounded-md" type="text" placeholder="Nachname">
      </div>

      <div class="w-full flex justify-between items-center text-white py-2">
        <p>E-Mail</p>
        <input class="w-[340px] h-[52px] px-4 bg-homeCard bg-opacity-5 rounded-md" type="text" placeholder="E-Mail">
      </div>

      <div class="w-full flex justify-between items-center text-white pt-4">
        <p>Passwort</p>
        <button class="w-[170px] h-10 rounded-md bg-homeCard text-black font-semibold">Passwort ändern</button>
      </div>

    </div>
  </div>

</template>
