"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Post from "./post";
import { useGetPaginatedPostsQuery } from "@/store/api";
import { nextPage } from "@/store/paginationSlice";

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
        document.body.scrollHeight - window.scrollY === window.innerHeight;
      if (bottom) {
        dispatch(nextPage());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, dispatch]);

  return (
    <main ref={listRef}>
      {posts &&
        posts.map((post: Post) => <Post key={post.id} post={post}></Post>)}
    </main>
  );
}
