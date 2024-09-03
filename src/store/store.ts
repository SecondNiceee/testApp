import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";
import DatesSlice from "./reducers/DatesSlice";


export const store = configureStore({
    reducer : {
        UserSlice: UserSlice,
        DatesSlice : DatesSlice
   },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false})
})




export type RootState = ReturnType<AppStore['getState']>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]