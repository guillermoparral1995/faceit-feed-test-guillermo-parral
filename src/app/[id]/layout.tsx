"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <section className="p-4">
      <nav onClick={() => router.back()}>&#8592; Back to home</nav>

      {children}
    </section>
  );
}
