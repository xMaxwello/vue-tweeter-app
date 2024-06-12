import axios from 'axios';
import { apiUrl, apiConfig } from "./apiConfig";
import MyAccount from "../types/myAccount.ts";
import {authError} from "./apiError.ts";



const getAuthenticatedUser = async () => {
    const res = await axios.get(`${apiUrl}/auth/profile`,apiConfig)
    if(res.status ===200){
        return new MyAccount(
            res.data.data.id,
            res.data.data.full_name,
            res.data.data.avatar_url,
            res.data.data.first_name,
            res.data.data.last_name,
            res.data.data.email,
            res.data.data.has_two_factor_enabled,
            res.data.data.permissions
        );
    }
}

const searchUser = async (searchQuery:string) => {
    if(searchQuery != null && searchQuery != ''){
        const res = await axios.get(`${apiUrl}/users/following?search=${searchQuery}`,apiConfig);
        if(res.status == 200){
            return res.data.data;
        }
    }
    return null;
}
const followUser = async (id: Number) => {
    const res = await axios.post(`${apiUrl}/users/${id}/following`,apiConfig);
    return res.status == 200;
}

const updateMyAccount = async (
    firstName: string|null,
    lastName: string|null,
    email: string|null,
    emailConfirmation: string|null,
    password: string|null,
    passwordConfirmation: string|null,
    currentPassword: string|null
): Promise<MyAccount|null> => {
    const updated: UserProfileUpdate = {};
    if (firstName !== null) {
        updated['first_name'] = firstName;
    }
    if (lastName !== null) {
        updated['last_name'] = lastName;
    }
    if (email !== null && emailConfirmation !== null) {
        updated['email'] = email;
        updated['email_confirmation'] = emailConfirmation;
    }
    if (password !== null && passwordConfirmation !== null && currentPassword !== null) {
        updated['password'] = password;
        updated['password_confirmation'] = passwordConfirmation;
        updated['current_password'] = currentPassword;
    }

    const res = await axios.put(`${apiUrl}/auth/profile`, updated, apiConfig)
        .catch((error) => {
            throw new authError(error.response.data.message);
        });

    if (res.status === 200) {
        return new MyAccount(
            res.data.data.id,
            res.data.data.full_name,
            res.data.data.avatar_url,
            res.data.data.first_name,
            res.data.data.last_name,
            res.data.data.email,
            res.data.data.has_two_factor_enabled,
            res.data.data.permissions
        );
    }
    return null;
}

const updateMyProfilePicture = async (image: File | null):Promise<string|null> => {
    const formData = new FormData();
    if (image) {
        formData.append('image', image);
    }

    const res =
        await axios.post(`${apiUrl}/auth/profile-image`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
        });

    if(res.status === 200) {
        return res.data.data;
    }

    return null;
}

const deleteMyProfilePicture = async () => {
    try {
        const response = await axios.delete(`${apiUrl}/auth/profile-image`, apiConfig);
        if (response.status === 200) {
            console.log("Profile picture deleted successfully.");
            return true;
        }
    } catch (error) {
        console.error("Failed to delete profile picture:", error);
        return false;
    }
};

export {
    getAuthenticatedUser,
    searchUser,
    followUser,
    updateMyAccount,
    updateMyProfilePicture,
    deleteMyProfilePicture,
}