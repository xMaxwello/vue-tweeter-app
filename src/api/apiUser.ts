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

const updateMyAccount = async (
    firstName:string|null,
    lastName:string|null,
    email:string|null,
    emailConfirmation:string|null,
    password:string|null,
    passwordConfirmation:string|null,
    currentPassword:string|null
) => {
    let updated;
    if (firstName !== null) {
        updated = {
            'first_name': firstName,
        }
    }
    else if (lastName !== null) {
        updated = {
            'last_name': lastName,
        }
    }else if (email && emailConfirmation){
        updated = {
            'email': email,
            'email_confirmation': emailConfirmation,
            'password': password,
        };
    }else if (password && passwordConfirmation && currentPassword){
        updated = {
            'password': password,
            'password_confirmation': passwordConfirmation,
            'current_password': currentPassword,
        };
    }
    const res = await axios
        .put(`${apiUrl}/auth/profile`, updated,apiConfig)
        .catch((error) => {
            throw new authError(error.response.data.message);
        });

    if(res.status == 200){
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

export {
    getAuthenticatedUser,
    updateMyAccount,
    updateMyProfilePicture,
}