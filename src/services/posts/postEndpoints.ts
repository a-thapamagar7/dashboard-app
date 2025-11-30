import { api } from "@/services/api";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetPostsParams {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  tag?: string;
}

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, GetPostsParams>({
      query: ({
        limit = 10,
        skip = 0,
        search = "",
        sortBy = "",
        order = "asc",
        tag = "",
      }) => {
        const params = { limit, skip, ...(sortBy && { sortBy, order }) };
        if (tag) return { url: `/posts/tag/${tag}`, params };
        if (search)
          return { url: `/posts/search`, params: { ...params, q: search } };
        return { url: `/posts`, params };
      },
      providesTags: ["Posts"],
    }),
    getPostTags: builder.query<string[], void>({
      query: () => `/posts/tag-list`,
      transformResponse: (response: string[]) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useGetPostTagsQuery } = postApi;
