import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import {
    deleteObject,
    getDownloadURL,
    getMetadata,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase/config";
import { auth } from "../../firebase/config";

export const upload = async (file, currentUser) => {
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

export const uploadNewAvatar = createAsyncThunk(
    "authorization/uploadNewAvatar",
    async (data, thunkAPI) => {
        try {
            let photoFromDB = null;
            const response = await fetch(data[1]);
            const blob = await response.blob();
            const fileRef = ref(storage, "profileAvatars/" + data[0] + ".png");
            try {
                const exitingFile = await getMetadata(fileRef);
                await deleteObject(fileRef);
            } catch (error) {
                console.log(error);
            }
            await uploadBytesResumable(fileRef, blob);
            await getDownloadURL(fileRef).then(data => {
                photoFromDB = data;
            });
            return photoFromDB;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    "authorization/login",
    async (userData, thunkAPI) => {
        try {
            let userPhoto = null;
            const { email, password } = userData;
            const tryLogin = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (tryLogin) {
                const uid = tryLogin.user.uid;
                const userPhotoName = uid + ".png";
                const referense = ref(
                    storage,
                    "profileAvatars/" + userPhotoName
                );
                await getDownloadURL(referense).then(data => {
                    userPhoto = data;
                });
            }
            return [tryLogin.user, userPhoto];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "authorization/logout",
    async (_, thunkAPI) => {
        try {
            const result = await auth.signOut();
            return result;
            // return tryLogin._tokenResponse;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
