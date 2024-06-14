<script setup lang="ts">
import tweetContent from "../components/tweetContent.vue";
import router from "../router";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {Tweet} from "../types/userTweets.ts";
import {fetchMyTweets} from "../api/apiTweet.ts";
import loadSpinner from "../components/loadSpinner.vue";

let tweets = reactive<Tweet[]>([]);
const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreTweets = ref(true);

const loadMyTweets = async () => {
  if (isLoading.value || !hasMoreTweets.value) return;

  isLoading.value = true;
  try {
    const newTweets = await fetchMyTweets(currentPage.value);
    if (newTweets && newTweets.length > 0) {
      tweets.push(...newTweets.map(tweet => ({
        ...tweet
      })));
      currentPage.value++;
    } else {
      hasMoreTweets.value = false;
    }
  } catch (error) {
    console.error("Failed to load tweets:", error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(loadMyTweets);

function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    loadMyTweets();
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

function navigateToTweetDetails(tweetId) {
  router.push({name: 'TweetDetails', params: {id: tweetId}});
}
</script>

<template>
  <div class="flex justify-center py-24">
    <div class="w-full max-w-[751px] h-auto py-5 px-5 bg-homeCard bg-opacity-5 rounded-[10px]">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-white text-base font-medium">Meine Beiträge</h1>
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
