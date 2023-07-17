import { createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadPhotoToStore = createAsyncThunk(
    "storage/fetchUploadPhoto",
    async (data, thunkAPI) => {
        try {
            const responce = await fetch(data);
            const file = await responce.blob();
            const uid = Date.now().toString();
            const storageRef = ref(storage, uid);
            await uploadBytes(storageRef, file);
            const storeLink = await getDownloadURL(ref(storageRef));
            return storeLink;
        } catch (error) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deletePhoto = createAsyncThunk(
    "storage/deletePhoto",
    async (data, thunkAPI) => {
        try {
            const photo = await fetch(data);
            const desertRef = ref(storage, photo);
            await deleteObject(desertRef);
        } catch (error) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
