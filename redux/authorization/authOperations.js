import { createAsyncThunk } from "@reduxjs/toolkit";

import { auth } from "../../firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { storage } from "../../firebase/config";
// import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

// const storage = getStorage();

// const upload = async (file, currentUser) => {
//     const fileRef = ref(storage, "profileAvatars/" + currentUser + ".png");
//     const snapshot = await uploadBytesResumable(fileRef, file);
// };

import { ref, uploadBytesResumable } from "firebase/storage";
const upload = async (file, currentUser) => {
    const response = await fetch(file);
    const blob = await response.blob();
    const fileRef = ref(storage, "profileAvatars/" + currentUser + ".png");
    await uploadBytesResumable(fileRef, blob);
};

export const registration = createAsyncThunk(
    "authorization/registration",
    async (userData, thunkAPI) => {
        try {
            const { userName, email, password, userPhoto } = userData;
            const tryRegistration = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (tryRegistration) {
                await updateProfile(auth.currentUser, {
                    displayName: userName,
                    photoURL: userPhoto,
                });

                await upload(userPhoto, tryRegistration.user.uid);
                return tryRegistration.user;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    "authorization/login",
    async (userData, thunkAPI) => {
        try {
            const { email, password } = userData;
            const tryLogin = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return tryLogin._tokenResponse;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
