import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type PaginationParams = {
    limit?: number,
    offset?: number,
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPaginatedPosts: builder.query<Post[], PaginationParams>({
      query: ({ limit = 20, offset = 0 }) => ({ url: `?limit=${limit}&offset=${offset}` }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }: { currentArg?: PaginationParams, previousArg?: PaginationParams }) {
        return currentArg?.limit !== previousArg?.limit || currentArg?.offset !== previousArg?.offset;
      },
    }),
    triggerNotification: builder.mutation<void, void>({
      query: () => ({
        url: '',
        method: 'POST',
      })
    })
  }),
})

export const { useGetPaginatedPostsQuery, useTriggerNotificationMutation } = postsApi