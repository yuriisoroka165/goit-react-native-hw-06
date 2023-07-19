import { createSlice } from "@reduxjs/toolkit";

import { addPost, getPosts, addComment, getComments } from "./postsOperations";

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
            })
            .addCase(addComment.pending, state => {
                // state.error = null;
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, { payload }) => {
                // перезапис коментарів в стейті

                // console.log(payload);
                // console.log(state.posts);
                // const postId = payload[0];
                // const updatedPost = state.posts.find(
                //     obj => (obj.hasOwnProperty(postId).comments = payload[1])
                // );
                // console.log(post);
                // console.log(...payload[1]);
                // state.posts = payload;

                state.error = null;
                state.isLoading = false;
            })
            .addCase(addComment.rejected, (state, { payload }) => {
                // state.error = payload;
                state.isLoading = false;
            })
            .addCase(getComments.pending, state => {
                // state.error = null;
                state.isLoading = true;
            })
            .addCase(getComments.fulfilled, (state, { payload }) => {
                console.log(payload);
                // state.posts = payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getComments.rejected, (state, { payload }) => {
                // state.error = payload;
                state.isLoading = false;
            });
    },
});

export default postsSlice.reducer;
