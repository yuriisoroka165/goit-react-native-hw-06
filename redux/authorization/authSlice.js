import { createSlice } from "@reduxjs/toolkit";

import { registration } from "./authOperations";

const initialState = {
    userId: "",
    userName: "",
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
            });
    },
});

export default authorizationSlice.reducer;
