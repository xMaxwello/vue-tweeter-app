<script setup lang="ts">
import tweetContent from "../components/tweetContent.vue";
import router from "../router";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {Tweet} from "../types/userTweets.ts";
import {fetchLikedTweets, fetchMyTweets} from "../api/apiTweet.ts";
import loadSpinner from "../components/loadSpinner.vue";

let tweets = reactive<Tweet[]>([]);
const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreTweets = ref(true);
const viewMode = ref('posts'); // 'posts' or 'likes'

const loadTweets = async (mode = 'posts') => {
  if (isLoading.value || !hasMoreTweets.value) return;

  isLoading.value = true;
  let newTweets;
  try {
    if (mode === 'posts') {
      newTweets = await fetchMyTweets(currentPage.value);
    } else {
      newTweets = await fetchLikedTweets(currentPage.value);
    }
    if (newTweets && newTweets.length > 0) {
      tweets.push(...newTweets.map(tweet => ({ ...tweet })));
      currentPage.value++;
    } else {
      hasMoreTweets.value = false;
    }
  } catch (error) {
    console.error(`Failed to load ${mode}:`, error);
  } finally {
    isLoading.value = false;
  }
};

const switchView = (mode) => {
  tweets = reactive([]);
  currentPage.value = 1;
  hasMoreTweets.value = true;
  viewMode.value = mode;
  loadTweets(mode);
};

onMounted(() => {
  loadTweets(viewMode.value);
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

function navigateToTweetDetails(tweetId) {
  router.push({ name: 'TweetDetails', params: { id: tweetId }});
}

function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    loadTweets(viewMode.value);
  }
}
</script>

<template>
  <div class="flex justify-center pt-24 pb-10">
    <div class="w-full max-w-[751px] h-auto py-5 px-5 bg-homeCard bg-opacity-5 rounded-[10px]">


    </div>
  </div>

  <div class="flex justify-center pb-24">
    <div class="w-full max-w-[751px] h-auto py-5 px-5 bg-homeCard bg-opacity-5 rounded-[10px]">
      <div class="w-full flex justify-around items-center">
        <button @click="switchView('posts')" class="text-white text-base font-medium">
          <span>Meine Beiträge</span>
        </button>
        <button @click="switchView('likes')" class="text-white text-base font-medium">
          <span>Meine Likes</span>
        </button>
      </div>
      <div v-for="tweet in tweets" :key="tweet.id">
        <tweetContent
            :id="tweet.id"
            :profilePicURL="tweet.user.avatar_url"
            :imgURL="tweet.image_url"
            :name="tweet.user.full_name"
            :time="tweet.created_at"
            :text="tweet.body"
            :likes="tweet.likes_count"
            :isLiked="tweet.is_liked"
            :comments="tweet.comments_count"
            @openTweet="navigateToTweetDetails"
        />
      </div>
      <loadSpinner v-if="isLoading" class="pt-10"/>
    </div>
  </div>
</template>
