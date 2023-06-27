import { createAsyncThunk } from "@reduxjs/toolkit";

import { auth } from "../../firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

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
