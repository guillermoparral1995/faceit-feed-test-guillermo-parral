import Link from "next/link";
import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return (
    <section className="p-4">
      <nav>
        <Link className="text-sm" href="/">
          &#8592; Back to home
        </Link>
      </nav>

      {children}
    </section>
  );
}
