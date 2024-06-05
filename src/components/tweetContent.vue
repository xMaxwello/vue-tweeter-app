<script setup lang="ts">


const props = defineProps({
  tweets: Array
});
</script>

<template>
  <div v-for="tweet in props.tweets" :key="tweet.id" class="mt-3 w-full flex">
    <div class="flex">
      <img class="w-[40px] h-[40px] rounded-full mr-4" v-if="profilePicture" :src="profilePicture" alt="Profile Picture">
      <div v-if="!profilePicture" class="w-[40px] h-[40px] mr-4 bg-white rounded-full"></div>
    </div>

    <div class="flex flex-col flex-grow pl-4">
      <div class="flex items-center">
        <h2 class="text-white font-medium">{{ tweet.user.full_name }}</h2>
        <p class="text-gray-400 text-xs pl-4">{{ tweet.postDate }}</p>
      </div>
      <p class="text-white text-sm mt-2">{{ tweet.body }}</p>

      <div class="flex flex-row text-sm mt-4">
        <div class="flex flex-row items-center pr-4">
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" fill="white"/>
            </svg>
          </button>
          <p class="pl-2 text-white">{{ tweet.likesCount }}</p>
        </div>

        <div class="flex flex-row items-center pr-4">
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 17.17L18.83 16H4V4H20V17.17ZM20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22V4C22 2.9 21.1 2 20 2Z" fill="white"/>
            </svg>
          </button>
          <p class="pl-2 text-white">{{ tweet.commentsCount }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

