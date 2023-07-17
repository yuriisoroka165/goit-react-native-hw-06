import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, update, ref } from "firebase/database";
import urid from "urid";

import { database } from "../../firebase/config";

export const addPost = createAsyncThunk(
    "posts/addPost",
    async (data, thunkAPI) => {
        try {
            await update(ref(database, `posts/${urid()}`), {
                ...data,
            });
            const dbRef = ref(database, "posts/");
            const queueSnapshot = await get(dbRef);
            const posts = queueSnapshot.val();
            const result = Object.keys(posts).map(key => ({
                [key]: posts[key],
            }));
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getPosts = createAsyncThunk(
    "posts/getPosts",
    async (_, thunkAPI) => {
        try {
            const dbRef = ref(database, "posts/");
            const queueSnapshot = await get(dbRef);
            const posts = queueSnapshot.val();
            const result = Object.keys(posts).map(key => ({
                [key]: posts[key],
            }));
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
