<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {getAuthenticatedUser, updateMyAccount, updateMyProfilePicture} from "../api/apiUser.ts";
import PasswordDialog from "../components/passwordDialog.vue";
import MyAccount from "../types/myAccount.ts";
import {useMyAccountStore} from "../stores/myAccountStore.ts";
import router from "../router";

const myAccountStore = useMyAccountStore();
const myAccount = ref<MyAccount|null>(myAccountStore.getMyAccount());
const profilePicture = ref(myAccount.value?.avatarUrl);
const firstName = ref(myAccount.value?.firstName);
const lastName = ref(myAccount.value?.lastName);
const email = ref(myAccount.value?.email);
const emailConfirmation = ref(myAccount.value?.email);
const emailChanged = ref(false);
const showMessage = ref(false);
const message = ref('');
const showPasswordDialog = ref(false);
const fileUpload = ref();

onBeforeMount(async () => {
  const res = await getAuthenticatedUser();
  if(res){
    myAccountStore.setMyAccount(res);
    myAccount.value = myAccountStore.getMyAccount();
    profilePicture.value = myAccount.value?.avatarUrl;
    firstName.value = myAccount.value?.firstName;
    lastName.value = myAccount.value?.lastName;
    email.value = myAccount.value?.email;
    emailConfirmation.value = myAccount.value?.email;
  }
  if(!myAccountStore.isMyAccountAuth){
    await router.push("/login");
  }
});

const handleProfilePictureUpload = async (event) => {
  const file = event.target.files[0];
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

const clickProfilePictureUpload = () => {
  fileUpload.value.click();
}

const updateName = async () => {
  if (!firstName.value && !lastName.value) {
    console.error('First and last names are required.');
    return;
  }
  console.log(`Updating name to: ${firstName.value} ${lastName.value}`);

  try {
    const updatedUser = await updateMyAccount(firstName.value, lastName.value, null, null, null, null, null);
    if (updatedUser) {
      console.log("Name updated successfully:", updatedUser);
    }
  } catch (error) {
    console.error('Failed to update name:', error);
  }
};

const displayMessage = () => {
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  },6000);
}

const changeEmail = () => {
  emailChanged.value = true;
}

const uploadEmail = async () => {
  if(firstName.value && lastName.value && email.value && emailConfirmation.value){
    if(email.value === emailConfirmation.value){
      const updatedUser = await updateMyAccount(
          firstName.value,
          lastName.value,
          email.value,
          emailConfirmation.value,
          null,
          null,
          null
      );
      if(updatedUser){
        myAccountStore.setMyAccount(updatedUser);
        console.log("E-mail updated successfully:", updatedUser);
        message.value = "E-mail wurde erfolgreich aktualisiert";
        displayMessage();
      }
      emailChanged.value = false;
    }else{
      message.value = "Error: Email stimmt nicht überein";
      displayMessage();
    }
  }else{
    message.value = "Error: Alle Felder müssen ausgefüllt werden";
    displayMessage();
  }
}

</script>

<template>
  <div class="flex justify-center pt-24">
    <div class="w-2/5 h-screen pt-5 px-5 bg-homeCard bg-opacity-5 rounded-t-[10px]">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-white text-base font-medium">Einstellungen</h1>
        <button @click="updateName" class="w-[170px] h-10 rounded-md bg-homeCard text-black font-semibold">Save Changes</button>
      </div>
      <hr class="w-full mt-4 border-white border-opacity-10"/>

      <div class="w-full flex justify-between items-center py-4">
        <img class="w-[40px] h-[40px] rounded-full" v-if="profilePicture" :src="profilePicture" alt="Profile Picture">
        <div v-if="!profilePicture" class="w-[40px] h-[40px] rounded-full bg-white"/>
        <input ref="fileUpload" type="file" class="file:absolute file:right-5 file:top-1 hidden" accept="image/*" @input="handleProfilePictureUpload">
        <button @click="clickProfilePictureUpload" class="text-xs md:text-sm lg:text-base font-semibold text-homeCard">Bild hochladen</button>
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
        <input class="w-[340px] h-[52px] px-4 bg-homeCard bg-opacity-5 rounded-md" type="email" v-model="email" @blur="changeEmail" @keydown.enter="changeEmail" @input="changeEmail">
      </div>

      <div v-if="emailChanged" class="w-full flex justify-between items-center text-white py-2">
        <p>E-Mail wiederholen</p>
        <input class="w-[340px] h-[52px] px-4 bg-homeCard bg-opacity-5 rounded-md" type="email" v-model="emailConfirmation" @blur="uploadEmail" @keydown.enter="uploadEmail" >
      </div>

      <div class="relative">
        <div class="w-full flex justify-between items-center text-white pt-4">
          <p>Passwort</p>
          <button @click="showPasswordDialog = true" class="w-[170px] h-10 rounded-md bg-homeCard text-black font-semibold">Passwort ändern</button>
        </div>
        <div v-if="showPasswordDialog" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click="showPasswordDialog = false">
          <div @click.stop>
            <PasswordDialog @close="showPasswordDialog = false" />
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
