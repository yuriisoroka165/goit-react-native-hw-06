import { createSlice } from "@reduxjs/toolkit";

import {
    addPost,
    getPosts,
    addComment,
    getCommmentatorsPhoto,
    addLike,
} from "./postsOperations";

const initialState = {
    posts: [],
    commentatorsPhoto: [],
    error: null,
    isLoading: false,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(addPost.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(addPost.fulfilled, (state, { payload }) => {
                state.posts = payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(addPost.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
            .addCase(getPosts.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, { payload }) => {
                state.posts = payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getPosts.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
            .addCase(addComment.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, { payload }) => {
                const postIndex = state.posts.findIndex(obj =>
                    obj.hasOwnProperty(payload[0])
                );
                if (postIndex !== -1) {
                    state.posts[postIndex][payload[0]] = payload[1];
                }
                state.error = null;
                state.isLoading = false;
            })
            .addCase(addComment.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
            .addCase(getCommmentatorsPhoto.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(getCommmentatorsPhoto.fulfilled, (state, { payload }) => {
                state.commentatorsPhoto = payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getCommmentatorsPhoto.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
            .addCase(addLike.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(addLike.fulfilled, (state, { payload }) => {
                const postIndex = state.posts.findIndex(obj =>
                    obj.hasOwnProperty(payload[0])
                );
                if (postIndex !== -1) {
                    state.posts[postIndex][payload[0]] = payload[1];
                }
                state.error = null;
                state.isLoading = false;
            })
            .addCase(addLike.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            });
    },
});

export default postsSlice.reducer;
