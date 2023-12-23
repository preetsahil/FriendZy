import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice"
import postsReducer from "./slices/postSlice";

export default configureStore({
  reducer: {
    appConfigReducer,  
    postsReducer,
  },
});
