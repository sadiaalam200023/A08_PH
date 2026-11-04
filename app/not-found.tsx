import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F6] px-6 text-center">

     
      <div className="relative mb-8 flex h-52 w-64 items-center justify-center">

        <div className="absolute h-40 w-40 rounded-full bg-[#E8DED3]" />

        <div className="relative flex h-32 w-32 rotate-[-8deg] items-center justify-center rounded-2xl border-4 border-[#98745B] bg-white shadow-xl">
          <span className="text-6xl">📸</span>
        </div>

        <span className="absolute right-4 top-4 text-4xl">✨</span>
        <span className="absolute bottom-3 left-4 text-3xl">🎨</span>
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#98745B]">
        StudioSpace
      </p>

      <h1 className="mb-4 text-7xl font-bold text-[#302820]">
        404
      </h1>

      <h2 className="mb-3 text-2xl font-semibold text-[#302820]">
        Looks like this space is unavailable!
      </h2>

      <p className="mb-8 max-w-md text-[#786F67]">
        The studio you are looking for may have moved,
        been removed, or does not exist.
      </p>

      <Link
        href="/"
        className="btn border-0 bg-[#98745B] px-8 text-white hover:bg-[#806047]"
      >
        Return to Home
      </Link>

    </main>
  );
}