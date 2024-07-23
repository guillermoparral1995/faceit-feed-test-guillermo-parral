"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetPaginatedPostsQuery } from "@/store/api";
import { nextPage } from "@/store/paginationSlice";
import Post from "@/components/Post";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLElement>(null);
  const offset = useAppSelector((state) => state.pagination.offset);

  const {
    data: posts,
    error,
    isLoading,
    isFetching,
  } = useGetPaginatedPostsQuery({ limit: 20, offset });

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop ===
        window.innerHeight;
      if (bottom && !isLoading && !isFetching) {
        dispatch(nextPage());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isLoading, isFetching]);

  return (
    <main ref={listRef}>
      {posts &&
        posts.map((post: Post) => <Post key={post.id} post={post}></Post>)}
      {(isFetching || isLoading) && <LoadingSkeleton />}
    </main>
  );
}
