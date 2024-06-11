<script setup lang="ts">
import makeTweet from "../components/makeTweet.vue";
import tweetContent from "../components/tweetContent.vue";
import {fetchTweets} from "../api/apiTweet.ts";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import loadSpinner from "../components/loadSpinner.vue";
import {Tweet} from "../types/userTweets.ts";
import router from "../router";



const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreTweets = ref(true);
let tweets = reactive<Tweet[]>([]);

const loadTweets = async () => {
  if (isLoading.value || !hasMoreTweets.value) return;

  isLoading.value = true;
  try {
    const newTweets = await fetchTweets(currentPage.value);
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
onMounted(loadTweets);

function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    loadTweets();
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
  <div class="flex justify-center pt-24">
    <div class="w-[751px] h-full pt-3 pb-4 px-5 bg-homeCard bg-opacity-5 rounded-t-[10px]">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-white text-base font-medium">Home</h1>
        <div class="w-60 h-10 rounded-md bg-homeCard bg-opacity-5 border-2 border-transparent flex flex-row-reverse items-center px-2">
          <input type="text" placeholder="Suchen" class="w-full h-full text-xs md:text-sm lg:text-base bg-transparent text-white placeholder-opacity-50 outline-none pl-2 peer"/>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path d="M15.5 14H14.71L14.43 13.73C15.0549 13.004 15.5117 12.1488 15.7675 11.2256C16.0234 10.3025 16.072 9.33416 15.91 8.39001C15.44 5.61001 13.12 3.39001 10.32 3.05001C9.33559 2.92547 8.33576 3.02778 7.397 3.34909C6.45824 3.67041 5.60542 4.20222 4.90381 4.90384C4.20219 5.60545 3.67038 6.45827 3.34906 7.39703C3.02775 8.33579 2.92544 9.33562 3.04997 10.32C3.38997 13.12 5.60998 15.44 8.38998 15.91C9.33413 16.0721 10.3024 16.0234 11.2256 15.7676C12.1487 15.5117 13.0039 15.055 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.49997 14C7.00997 14 4.99997 11.99 4.99997 9.50001C4.99997 7.01 7.00997 5.00001 9.49997 5.00001C11.99 5.00001 14 7.01 14 9.50001C14 11.99 11.99 14 9.49997 14Z" fill="white"/>
            </g>
          </svg>
        </div>
      </div>
      <hr class="w-full mt-3 border-white border-opacity-10"/>
      <makeTweet/>
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
