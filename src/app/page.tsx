"use client";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postsApi, useGetPaginatedPostsQuery } from "@/store/api";
import { nextPage, setupForNewPost } from "@/store/paginationSlice";
import Post from "@/components/Post";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { limit, offset } = useAppSelector((state) => state.pagination);
  const [highlight, setHighlight] = useState<boolean>(false);

  // Fetch paginated posts from the API
  const {
    data: paginatedPosts,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginatedPostsQuery({ limit, offset });

  // Initialise WebSocket connection with the server, and trigger a refetch when a new post is received
  // When refetch has happened, scroll to and highlight new post
  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("new_post", () => {
      dispatch(postsApi.util.resetApiState());
      dispatch(setupForNewPost());
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 3000);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch, refetch]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop ===
        window.innerHeight;
      if (bottom && !isLoading && !isFetching && paginatedPosts?.hasNext) {
        dispatch(nextPage());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isLoading, isFetching, paginatedPosts?.hasNext]);

  // Trigger new post by calling the API. Don't use a mutation so that automatic refetch is not enacted.
  // In real-life, a new post would be created without the user knowing about it and the server would be informed
  // via some kind of event broker. For the sake of this example, we're just calling the API directly.
  const handleTriggerNewPost = useCallback(() => {
    fetch("/api", { method: "POST" });
  }, []);

  return (
    <>
      <button
        className="border rounded-sm fixed p-2 bg-cyan-500 cursor-pointer z-10"
        onClick={handleTriggerNewPost}
      >
        Trigger new post
      </button>
      <main>
        {paginatedPosts?.posts &&
          paginatedPosts.posts.map((post: Post, idx: number) => (
            <Post
              key={post.id}
              post={post}
              withHighlight={highlight && idx === 0}
            />
          ))}
        {(isFetching || isLoading) && <LoadingSkeleton />}
      </main>
    </>
  );
}
