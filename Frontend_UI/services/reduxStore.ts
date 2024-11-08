import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sectionApi from "./apis/sectionService";

// Import or define your auth reducer
// import authReducer from "./authSlice"; // Assuming your auth reducer is in authSlice.js

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

const rootReducer = combineReducers({
  // auth: persistReducer(authPersistConfig, authReducer), 
  
  [sectionApi.reducerPath]: sectionApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    
    .concat(sectionApi.middleware),
});

//export const persistor = persistStore(store);

export default store;
