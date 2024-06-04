<script setup lang="ts">
import {useMyAccountStore} from "../stores/myAccountStore.ts";
import {ref} from "vue";
import MyAccount from "../types/myAccount.ts";

const myAccountStore = useMyAccountStore();
const myAccount = ref<MyAccount|null>(myAccountStore.getMyAccount());
const profilePicture = ref(myAccount.value?.avatarUrl);
</script>

<template>

    <div class="mt-3 w-full inline-flex">
      <img class="w-[40px] h-[40px] rounded-full" v-if="profilePicture" :src="profilePicture" alt="Profile Picture">
      <div v-if="!profilePicture" class="w-[40px] h-[40px] flex-none bg-white rounded-full" />
      <div class=" pl-4 w-full flex flex-col">
        <textarea placeholder="Was gibt es Neues?" class="bg-transparent text-base text-white outline-none" maxlength="200"></textarea>
        <div class="mt-2 md:mt-3 lg:mt-4 flex justify-between items-center">
          <div class="flex">
            <label class="inline-flex items-center text-white outline-none transition-all">
              <input type="file" accept="image/*" class="hidden">
              <svg class="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18 15.75C18 17.4833 17.3917 18.9583 16.175 20.175C14.9583 21.3917 13.4833 22 11.75 22C10.0167 22 8.54167 21.3917 7.325 20.175C6.10833 18.9583 5.5 17.4833 5.5 15.75V6.5C5.5 5.25 5.93767 4.18767 6.813 3.313C7.68833 2.43833 8.75067 2.00067 10 2C11.25 2 12.3127 2.43767 13.188 3.313C14.0633 4.18833 14.5007 5.25067 14.5 6.5V15.25C14.5 16.0167 14.2333 16.6667 13.7 17.2C13.1667 17.7333 12.5167 18 11.75 18C10.9833 18 10.3333 17.7333 9.8 17.2C9.26667 16.6667 9 16.0167 9 15.25V7C9 6.71667 9.096 6.47933 9.288 6.288C9.48 6.09667 9.71733 6.00067 10 6C10.2833 6 10.521 6.096 10.713 6.288C10.905 6.48 11.0007 6.71733 11 7V15.25C11 15.4667 11.071 15.646 11.213 15.788C11.355 15.93 11.534 16.0007 11.75 16C11.9667 16 12.146 15.929 12.288 15.787C12.43 15.645 12.5007 15.466 12.5 15.25V6.5C12.4833 5.8 12.2377 5.20833 11.763 4.725C11.2883 4.24167 10.7007 4 10 4C9.3 4 8.70833 4.24167 8.225 4.725C7.74167 5.20833 7.5 5.8 7.5 6.5V15.75C7.48333 16.9333 7.89167 17.9377 8.725 18.763C9.55833 19.5883 10.5667 20.0007 11.75 20C12.9167 20 13.9083 19.5877 14.725 18.763C15.5417 17.9383 15.9667 16.934 16 15.75V7C16 6.71667 16.096 6.47933 16.288 6.288C16.48 6.09667 16.7173 6.00067 17 6C17.2833 6 17.521 6.096 17.713 6.288C17.905 6.48 18.0007 6.71733 18 7V15.75Z"/>
              </svg>
              <span class="text-xs md:text-sm lg:text-base font-semibold">Anhang</span>
            </label>
            <button  class="ml-2 outline-none group">
              <svg class="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 fill-current text-white text-opacity-50 group-hover:text-red-700 group-hover:text-opacity-100 group-focus:text-red-700 group-focus:text-opacity-100 transition-colors" viewBox="0 -960 960 960">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/>
              </svg>
            </button>
          </div>
          <button  class="h-6 md:h-8 lg:h-10 px-4 md:px-6 lg:px-8 border-2 border-primary rounded-md text-white text-xs md:text-sm lg:text-base lg:font-semibold outline-none transition-colors">Tweet</button>
        </div>
      </div>
    </div>

</template>
