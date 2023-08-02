import { createAsyncThunk } from "@reduxjs/toolkit";

import { auth } from "../../firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

// const storage = getStorage();

// const upload = async (file, currentUser) => {
//     const fileRef = ref(storage, "profileAvatars/" + currentUser + ".png");
//     const snapshot = await uploadBytesResumable(fileRef, file);
// };

const upload = async (file, currentUser) => {
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
                // console.log(userPhoto);

                await upload(userPhoto, tryRegistration.user.uid);
                return tryRegistration.user;
            }
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
                // console.log(uid);
                const userPhotoName = uid + ".png";
                // console.log(userPhotoName);

                // let imageRef = storage.ref("profileAvatars/" + userPhotoName);
                // imageRef
                //     .getDownloadURL()
                //     .then(url => {
                //         //from url you can fetched the uploaded image easily
                //         this.setState({ profileImageUrl: url });
                //     })
                //     .catch(e =>
                //         console.log("getting downloadURL of image error => ", e)
                //     );
                const referense = ref(
                    storage,
                    "profileAvatars/" + userPhotoName
                );
                // console.log(referense);
                await getDownloadURL(referense).then(data => {
                    // console.log(data);
                    userPhoto = data;
                });
            }
            // console.log([tryLogin.user, userPhoto]);
            return [tryLogin.user, userPhoto];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "authorization/logout",
    async (userData, thunkAPI) => {
        try {
            const result = await auth.signOut();
            return result;
            return tryLogin._tokenResponse;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// const ok = {
//     _tokenResponse: {
//         displayName: "Yurii Soroka",
//         email: "yurisoroka165@gmail.com",
//         expiresIn: "3600",
//         idToken:
//             "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiWXVyaWkgU29yb2thIiwicGljdHVyZSI6ImZpbGU6Ly8vZGF0YS91c2VyLzAvaG9zdC5leHAuZXhwb25lbnQvY2FjaGUvRXhwZXJpZW5jZURhdGEvJTI1NDBhbm9ueW1vdXMlMjUyRmdvaXQtcmVhY3QtbmF0aXZlLWh3LTA2LWE5YmFhODY4LWE3ZWUtNDM1NS1hZDliLTVhOGVhODI0M2E1Ni9JbWFnZVBpY2tlci9jMjAzMDgzNC1lMDZkLTRlMzQtOWFlNi1jZWM0YjczMGNmYWQuanBlZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yZWFjdC1uYXRpdmUtMzg5MzE0IiwiYXVkIjoicmVhY3QtbmF0aXZlLTM4OTMxNCIsImF1dGhfdGltZSI6MTY4ODU0NDE5MSwidXNlcl9pZCI6Inp4bFpVME5KNGVXajR3aWlvWG9mYW11aUJiQzMiLCJzdWIiOiJ6eGxaVTBOSjRlV2o0d2lpb1hvZmFtdWlCYkMzIiwiaWF0IjoxNjg4NTQ0MTkxLCJleHAiOjE2ODg1NDc3OTEsImVtYWlsIjoieXVyaXNvcm9rYTE2NUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsieXVyaXNvcm9rYTE2NUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.LRGJIl9wPZdVROZKBFeL3anepOworZwtr047lz1YEHhwJB9r6D9a7LCjoLIDwYbblen2jlLuFxFx4qv9-YWwW9oPE7yjyBThilLARvN9GAIyQnPWl2hXmm0UcwQlvqHGgpC3s6fbFJfiFt4o_uq_kHsPKvPjCNBBUGvqusK-svaOg3VrOUI1MPXUEVGCh1Ac2RFg9yyTGk_tYhDY0O4UF5hrmVlW4djphmHg6BjPxX8icDaHITDczWI0TA2DSbtq1VDRx1qkmor2YgkCcGhwKCv7B2ORCNjGDcGQkPsb86yKqLhGheWL8BBr_2zRhkT3WwI4PT82SC-uj1xhuCNQ7Q",
//         kind: "identitytoolkit#VerifyPasswordResponse",
//         localId: "zxlZU0NJ4eWj4wiioXofamuiBbC3",
//         profilePicture:
//             "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fgoit-react-native-hw-06-a9baa868-a7ee-4355-ad9b-5a8ea8243a56/ImagePicker/c2030834-e06d-4e34-9ae6-cec4b730cfad.jpeg",
//         refreshToken:
//             "APZUo0RTVlYcG0B0tyqIY2YQza1LKBtP7gRB1Mw_sTmRI64WKAqx96ErmMo8bpToT5Z6khU_hJU1njvhi_C-MPkkk5ImSRrclAo3IxM13IAhl3mbBKkIQHUBivj1w2WqqwZAA11AO9FPJAW4G-qj_6PcSMaIKwi6V2-lj9KISJ_1_mD3sU_Ad5_4oaJTleAZ1Or35mvAZl5nCNBZoPgrM0_sKds0PAwNrFfqkIUw-8pWGuqraWEfFAKyoaXMLDCMGwuZ58ALh4-8",
//         registered: true,
//     },
//     operationType: "signIn",
//     providerId: null,
//     user: {
//         _redirectEventId: undefined,
//         apiKey: "AIzaSyB-vJ2hpLrgXpVhuBgtQ-YAmvlbtf7TxtA",
//         appName: "[DEFAULT]",
//         createdAt: "1688543064991",
//         displayName: "Yurii Soroka",
//         email: "yurisoroka165@gmail.com",
//         emailVerified: false,
//         isAnonymous: false,
//         lastLoginAt: "1688544122863",
//         phoneNumber: undefined,
//         photoURL:
//             "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fgoit-react-native-hw-06-a9baa868-a7ee-4355-ad9b-5a8ea8243a56/ImagePicker/c2030834-e06d-4e34-9ae6-cec4b730cfad.jpeg",
//         providerData: [Array],
//         stsTokenManager: [Object],
//         tenantId: undefined,
//         uid: "zxlZU0NJ4eWj4wiioXofamuiBbC3",
//     },
// };
