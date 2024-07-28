import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from './api'
import paginationReducer from './paginationSlice'

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})
export const makeStore = () => store
export default store
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']