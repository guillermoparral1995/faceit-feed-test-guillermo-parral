import { createSlice } from '@reduxjs/toolkit'

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
      if (state.limit !== 20) {
        state.limit = 20
      }
    },
    setupForNewPost: (state) => {
      state.limit = state.offset + state.limit
      state.offset = 0
    }
  },
})

export const { nextPage, setupForNewPost } = paginationSlice.actions

export default paginationSlice.reducer