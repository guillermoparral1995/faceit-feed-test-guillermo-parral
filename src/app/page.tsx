"use client";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { postsApi, useGetPaginatedPostsQuery } from "@/store/api";
import { nextPage } from "@/store/paginationSlice";
import Post from "@/components/Post";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { limit, offset } = useAppSelector((state) => state.pagination);
  const [highlight, setHighlight] = useState<boolean>(false);

  const {
    data: paginatedPosts,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginatedPostsQuery({ limit, offset });

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("new_post", (message: Post) => {
      dispatch(postsApi.util.resetApiState());
      refetch();
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
            ></Post>
          ))}
        {(isFetching || isLoading) && <LoadingSkeleton />}
      </main>
    </>
  );
}
