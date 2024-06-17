<script setup lang="ts">
import tweetContent from "../components/tweetContent.vue";
import router from "../router";
import {onBeforeMount, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {Tweet} from "../types/userTweets.ts";
import {fetchMyTweets, fetchTweets} from "../api/apiTweet.ts";
import loadSpinner from "../components/loadSpinner.vue";
import {useMyAccountStore} from "../stores/myAccountStore.ts";
import MyAccount from "../types/myAccount.ts";
import {getAuthenticatedUser} from "../api/apiUser.ts";
import generatePFP from "../components/generatePFP.vue";

let tweets = reactive<Tweet[]>([]);
const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreTweets = ref(true);
const viewMode = ref('posts');
const myAccountStore = useMyAccountStore();
const myAccount = ref<MyAccount|null>(myAccountStore.getMyAccount());
const profilePicture = ref(myAccount.value?.avatar_url);
const fullName = ref(myAccount.value?.firstName);

onBeforeMount(async () => {
  const res = await getAuthenticatedUser();
  if(res){
    myAccountStore.setMyAccount(res);
    myAccount.value = myAccountStore.getMyAccount();
    profilePicture.value = myAccount.value?.avatar_url;
    fullName.value = myAccount.value?.full_name;
  }
  if(!myAccountStore.isMyAccountAuth){
    await router.push("/login");
  }
});

const loadTweets = async () => {
  if (isLoading.value || !hasMoreTweets.value) return;

  isLoading.value = true;
  try {
    let fetchedTweets;
    if (viewMode.value === 'posts') {
      fetchedTweets = await fetchMyTweets(currentPage.value);
    } else {
      fetchedTweets = await fetchTweets(currentPage.value);
      fetchedTweets = fetchedTweets.filter(tweet => tweet.is_liked);
    }
    if (fetchedTweets && fetchedTweets.length > 0) {
      tweets.push(...fetchedTweets);
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

const refreshTweets = async () => {
  currentPage.value = 1;
  tweets = reactive<Tweet[]>([]);
  await loadTweets();
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
      <div class="w-full flex justify-between items-center">
        <h1 class="text-white text-base font-medium">Mein Profil</h1>
      </div>
      <hr class="w-full my-5 border-white border-opacity-10"/>
      <img class="w-[100px] h-[100px] rounded-full" v-if="profilePicture" :src="profilePicture" alt="Profile Picture">
      <div v-if="!profilePicture">
        <generatePFP :full-name="fullName" class="w-[100px] h-[100px] text-2xl"/>
      </div>
      <h1 class="pt-4 text-white text-xl font-semibold">{{ fullName }}</h1>


    </div>
  </div>

  <div class="flex justify-center pb-24">
    <div class="w-full max-w-[751px] h-auto py-5 px-5 bg-homeCard bg-opacity-5 rounded-[10px]">
      <div class="w-full flex justify-around items-center">
        <button
            @click="switchView('posts')"
            :class="viewMode === 'posts' ? 'border-b-2 border-homeCard' : ''"
            class="text-white font-medium py-2 px-4 transition-colors duration-200"
        >
          Meine Beiträge
        </button>
        <button
            @click="switchView('likes')"
            :class="viewMode === 'likes' ? 'border-b-2 border-homeCard' : ''"
            class="text-white font-medium py-2 px-4 transition-colors duration-200"
        >
          Meine Likes
        </button>
      </div>
      <div v-for="tweet in tweets" :key="tweet.id">
        <tweetContent @clicked-like='refreshTweets'
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
