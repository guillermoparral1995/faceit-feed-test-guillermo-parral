"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  useGetPaginatedPostsQuery,
  useTriggerNotificationMutation,
} from "@/store/api";
import { nextPage } from "@/store/paginationSlice";
import Post from "@/components/Post";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useWebSocket } from "next-ws/client";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLElement>(null);
  const offset = useAppSelector((state) => state.pagination.offset);
  const ws = useWebSocket();

  const {
    data: posts,
    error,
    isLoading,
    isFetching,
  } = useGetPaginatedPostsQuery({ limit: 20, offset });

  const [triggerNotification, triggerResult] = useTriggerNotificationMutation();

  useEffect(() => {
    async function onMessage(event: MessageEvent) {
      const payload =
        typeof event.data === "string" ? event.data : await event.data.text();
      const message = JSON.parse(payload);
    }

    ws?.addEventListener("message", onMessage);
    return () => ws?.removeEventListener("message", onMessage);
  }, [ws]);

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

  const handleTriggerNewPost = () => {
    triggerNotification();
  };

  return (
    <>
      <button onClick={handleTriggerNewPost}>Trigger new post</button>
      <main ref={listRef}>
        {posts &&
          posts.map((post: Post) => <Post key={post.id} post={post}></Post>)}
        {(isFetching || isLoading) && <LoadingSkeleton />}
      </main>
    </>
  );
}
