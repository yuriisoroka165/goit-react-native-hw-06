import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import rootReducer from "./rootReducer";

import authorizationReducer from "./authorization/authSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    authorization: authorizationReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    "authorization/registration/fulfilled",
                ],
                ignoredPaths: ["firebase", "firestore"],
            },
        }),
});

const persistor = persistStore(store);

// export default { store, persistor };
export default store;
