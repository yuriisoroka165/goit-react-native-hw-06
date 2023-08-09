import { createSlice } from "@reduxjs/toolkit";

import { registration, login, logout, uploadNewAvatar } from "./authOperations";

const initialState = {
    userId: "",
    userName: "",
    email: "",
    userPhoto: "",
    isAuthorized: false,
    error: null,
    isLoading: false,
};

const authorizationSlice = createSlice({
    name: "authorization",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(registration.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state, { payload }) => {
                const { uid, email, displayName, photoURL } = payload;
                state.userId = uid;
                state.userName = displayName;
                state.email = email;
                state.userPhoto = photoURL;
                state.error = null;
                state.isAuthorized = true;
                state.isLoading = false;
            })
            .addCase(registration.rejected, (state, { payload }) => {
                state.error = payload;
                state.isAuthorized = false;
                state.isLoading = false;
            })
            .addCase(login.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                const { email, displayName, uid } = payload[0];
                const photoURL = payload[1];
                state.userId = uid;
                state.userName = displayName;
                state.email = email;
                state.userPhoto = photoURL;
                state.error = null;
                state.isAuthorized = true;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.error = payload;
                state.isAuthorized = false;
                state.isLoading = false;
            })
            .addCase(logout.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, state => {
                state.userId = null;
                state.userName = null;
                state.email = null;
                state.userPhoto = null;
                state.error = null;
                state.isAuthorized = false;
                state.isLoading = false;
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.error = payload;
                state.userId = null;
                state.userName = null;
                state.email = null;
                state.userPhoto = null;
                state.isAuthorized = false;
                state.isLoading = false;
            })
            .addCase(uploadNewAvatar.pending, state => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(uploadNewAvatar.fulfilled, (state, { payload }) => {
                state.userPhoto = payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(uploadNewAvatar.rejected, state => {
                state.isLoading = false;
            });
    },
});

export default authorizationSlice.reducer;
