import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, update, ref } from "firebase/database";
import urid from "urid";

import { database } from "../../firebase/config";
import { storage } from "../../firebase/config";
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";

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

export const getCommmentatorsPhoto = createAsyncThunk(
    "posts/getCommmentatorsPhoto",
    async (_, thunkAPI) => {
        // const referense = storageRef(storage, "profileAvatars");
        // console.log(referense);
        // await getDownloadURL(referense).then(data => {
        //     // console.log(data);
        // });
        // // return { uid, photo };
        const folderRef = storageRef(storage, "profileAvatars");
        const photos = [];

        try {
            const { items } = await listAll(folderRef);
            for (const itemRef of items) {
                const url = await getDownloadURL(itemRef);
                const uidFromfileName = itemRef.name.split(".")[0];
                photos.push({ uid: uidFromfileName, url });
            }
            return photos;
        } catch (error) {
            return error;
        }
    }
);

// export const getComments = createAsyncThunk(
//     "posts/getComments",
//     async (postId, thunkAPI) => {
//         try {
//             const dbRef = ref(database, `posts/${postId}/comments`);
//             const queueSnapshot = await get(dbRef);
//             const comments = queueSnapshot.val();
//             const result = Object.keys(comments).map(key => ({
//                 [key]: comments[key],
//             }));
//             return result;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
