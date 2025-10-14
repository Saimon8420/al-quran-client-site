import { quranBaseApi } from "@/components/redux/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import metaReducer from "@/components/redux/slices/metaSlice";

export const store = configureStore({
  reducer: {
    [quranBaseApi.reducerPath]: quranBaseApi.reducer,
    meta: metaReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quranBaseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
