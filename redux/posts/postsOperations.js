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

export const addComment = createAsyncThunk(
    "posts/addComment",
    async (data, thunkAPI) => {
        try {
            await update(ref(database, `posts/${data[0]}/comments/${urid()}`), {
                ...data[1],
            });
            const dbRef = ref(database, `posts/${data[0]}/comments`);
            const queueSnapshot = await get(dbRef);
            const comments = queueSnapshot.val();
            const result = Object.keys(comments).map(key => ({
                [key]: comments[key],
            }));
            return [data[0], result];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getComments = createAsyncThunk(
    "posts/getComments",
    async (postId, thunkAPI) => {
        try {
            const dbRef = ref(database, `posts/${postId}/comments`);
            const queueSnapshot = await get(dbRef);
            const comments = queueSnapshot.val();
            const result = Object.keys(comments).map(key => ({
                [key]: comments[key],
            }));
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
