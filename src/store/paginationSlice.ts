import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaginationState {
  limit: number
  offset: number
}

const initialState: PaginationState = {
  limit: 20,
  offset: 0,
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.offset += state.limit
    },
  },
})

export const { nextPage } = paginationSlice.actions

export default paginationSlice.reducer