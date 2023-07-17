import { createSlice } from "@reduxjs/toolkit";

import { addPost, getPosts } from "./postsOperations";

const initialState = {
    posts: [],
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
            });
    },
});

export default postsSlice.reducer;
