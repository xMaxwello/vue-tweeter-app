<script setup lang="ts">
import {ref} from "vue";
import {updateMyAccount, updateMyProfilePicture} from "../api/apiUser.ts";
import PasswordDialog from "../components/passwordDialog.vue";


const firstName = ref('');
const lastName = ref('');
const email = ref('');
const showPasswordDialog = ref(false);

const handleUpdateProfile = async () => {
  try {
    const updatedUser = await updateMyAccount(firstName.value, lastName.value, email.value, null, null, null, null);
    if (updatedUser) {
      console.log("Profile updated successfully:", updatedUser);
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
};

const handleProfilePictureUpload = async (event) => {
  const file = event.target.files[0]; // Assuming single file upload
  if (file) {
    try {
      const imageUrl = await updateMyProfilePicture(file);
      if (imageUrl) {
        console.log("Profile image updated:", imageUrl);
      }
    } catch (error) {
      console.error('Failed to upload profile image:', error);
    }
  }
};
</script>

<template>
  <div class="flex justify-center pt-24">
    <div class="w-2/5 h-screen pt-5 px-5 bg-homeCard bg-opacity-5 rounded-t-[10px]">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-white text-base font-medium">Einstellungen</h1>
        <button @click="handleUpdateProfile" class="w-[170px] h-10 rounded-md bg-homeCard text-black font-semibold">Save Changes</button>
      </div>
      <hr class="w-full mt-4 border-white border-opacity-10"/>

      <div class="w-full flex justify-between items-center py-4">
        <div class="w-[40px] h-[40px] flex-none bg-white rounded-full" />
        <button class="text-xs md:text-sm lg:text-base font-semibold text-homeCard">Bild hochladen</button>
      </div>

      <div class="w-full flex justify-between items-center text-white py-2">
        <p>Vorname</p>
        <input v-model="firstName" class="w-[340px] h-[52px]  px-4 bg-homeCard bg-opacity-5 rounded-md" type="text" placeholder="Vorname">
      </div>

      <div class="w-full flex justify-between items-center text-white py-2">
        <p>Nachname</p>
        <input v-model="lastName" class="w-[340px] h-[52px] px-4 bg-homeCard bg-opacity-5 rounded-md" type="text" placeholder="Nachname">
      </div>

      <div class="w-full flex justify-between items-center text-white py-2">
        <p>E-Mail</p>
        <input v-model="email" class="w-[340px] h-[52px] px-4 bg-homeCard bg-opacity-5 rounded-md" type="text" placeholder="E-Mail">
      </div>

      <div class="w-full flex justify-between items-center text-white pt-4">
        <p>Passwort</p>
        <button @click="showPasswordDialog = true" class="w-[170px] h-10 rounded-md bg-homeCard text-black font-semibold">Passwort ändern</button>
        <PasswordDialog v-if="showPasswordDialog" @close="showPasswordDialog = false" />
      </div>

    </div>
  </div>

</template>
