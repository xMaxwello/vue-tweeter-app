<script setup lang="ts">
import {logout} from "../api/apiLogin.ts";
import router from "../router";
import {useMyAccountStore} from "../stores/myAccountStore";
import {onMounted, ref} from "vue";
import {getAuthenticatedUser} from "../api/apiUser.ts";

const myAccountStore = useMyAccountStore();
const myAccount = ref(null);

const fetchUser = async () => {
  try {
    const user = await getAuthenticatedUser();
    if (user) {
      myAccountStore.setMyAccount(user);
      myAccount.value = user;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

onMounted(() => {
  fetchUser();
});


const signOut = () => {
  logout();
  myAccountStore.deleteMyAccount();
  router.push("/login");
}

</script>

<template>
  <div class="sidebar text-white w-64 h-screen space-y-6 py-7 pl-2 sticky inset-y-0 left-0 transform transition duration-200 ease-in-out border-r-2 border-gray-500">
    <router-link to="home" class="text-white flex items-center space-x-2 px-4">
      <img src="../assets/Logoreanmo.svg" alt="Reanmo">
    </router-link>

    <nav>
      <router-link to="home" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Home</router-link>
      <router-link to="" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Meine Beiträge</router-link>
      <router-link to="settings" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Einstellungen</router-link>
      <button @click="signOut" class="block py-2.5 px-4 rounded-l-[10px] transition duration-200 hover:bg-blue-800">Abmelden</button>
    </nav>

    <div>
      <p>Angemeldet als:<br/>{{myAccount?.firstName}} {{myAccount?.lastName}}</p>
    </div>


  </div>
</template>