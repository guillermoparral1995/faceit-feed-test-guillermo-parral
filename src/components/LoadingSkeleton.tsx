const SkeletonPost = () => {
  return (
    <article className="animate-pulse flex gap-4 max-w-3xl mx-auto dark:prose-dark rounded-md border-2 border-slate-400 p-4 my-4">
      <div className="flex-none">
        <div className="w-10 h-10 bg-slate-400 rounded-sm"></div>
      </div>
      <div className="flex-auto">
        <div className="w-20 h-4 bg-slate-400 rounded-sm mb-2"></div>
        <div className="w-80 h-4 bg-slate-400 rounded-sm my-1"></div>
        <div className="w-40 h-4 bg-slate-400 rounded-sm my-1"></div>
      </div>
    </article>
  );
};

export default function LoadingSkeleton() {
  return (
    <>
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
    </>
  );
}
