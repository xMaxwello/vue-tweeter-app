<script setup lang="ts">
import { defineProps } from 'vue';
import UserAccount from '../types/userAccount.ts';
import {followUser} from "../api/apiUser.ts";

const props = defineProps<{
  users: UserAccount[];
}>();

const handleFollow = async (userId: number) => {
  try {
    const success = await followUser(userId);
    if (success) {
      const user = props.users.find(user => user.id === userId);
      if (user) {
        user.is_following = !user.is_following;
      }
    }
  } catch (error) {
    console.error('Failed to follow/unfollow:', error);
  }
};
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div v-for="user in users" :key="user.id" class="flex flex-row items-center justify-between py-4">
      <div class="flex flex-row items-center">
        <img class="w-[40px] h-[40px] object-cover rounded-full mr-4" v-if="user.avatar_url" :src="user.avatar_url" alt="Profile Picture">
        <div v-if="!user.avatar_url" class="w-[40px] h-[40px] mr-4 bg-white rounded-full"></div>
        <h1 class="pl-4 text-white">{{ user.full_name }}</h1>
      </div>
      <button @click="() => handleFollow(user.id)" class="w-[120px] h-10 rounded-md bg-homeCard text-black font-semibold">
        Folgen
      </button>
    </div>
  </div>
</template>
