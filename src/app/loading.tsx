export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e8e6de] border-t-[#526b50]" />

        <p className="text-sm font-medium text-[#526b50]">
          Preparing your perfect experience...
        </p>
      </div>
    </div>
  );
}
