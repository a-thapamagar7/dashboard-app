import { api } from "@/services/api";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ limit = 10, skip = 0 }) => ({
        url: "posts",
        params: {
          limit,
          skip,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery } = postApi;
