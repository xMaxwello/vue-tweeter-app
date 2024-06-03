import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import MyAccount from "../types/myAccount";

export const useMyAccountStore = defineStore('myAccountStore', () => {
    const myAccount = ref<MyAccount | null>(null);
    const setMyAccount = ((account: MyAccount | null) => myAccount.value = account);
    const getMyAccount = () => {return myAccount.value};
    const deleteMyAccount = () => myAccount.value = null;
    const isMyAccountAuth = computed<boolean>(() => myAccount.value !== null );

    return { myAccount, setMyAccount, getMyAccount, deleteMyAccount, isMyAccountAuth }
})