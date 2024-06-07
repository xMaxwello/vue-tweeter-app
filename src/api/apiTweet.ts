import axios from 'axios';
import {apiConfig, apiUrl} from "./apiConfig";
import Tweet from "../types/userTweets.ts";
import {TweetDetail} from "../types/tweetDetails.ts";

const fetchTweets = async (page: number):Promise<Tweet[] | null> => {
    if(page != null && page != 0){
        const res = await axios.get(`${apiUrl}/tweets?page=${page}`,apiConfig);
        if(res.status == 200){
            return res.data.data;
        }
    }
    return null;
}

const toggleLikeTweet = async (id:number):Promise<boolean|null> => {
    if(id != null){
        const res = await axios.post(`${apiUrl}/tweets/${id}/likes`,{},apiConfig)
        if(res.status == 200){
            return res.data.data;
        }
    }
    return null;
}

const fetchTweetDetails = async (id: number): Promise<TweetDetail | null> => {
    if(id != null) {
        const response = await axios.get(`${apiUrl}/tweets/${id}`, apiConfig);
        if (response.status === 200) {
            return response.data.data as TweetDetail;
        }
    }
    return null;
}

export {
    fetchTweets,
    toggleLikeTweet,
    fetchTweetDetails
}