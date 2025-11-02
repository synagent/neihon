"use client";

export default function Error({ error }: { error: Error }) {
  return <main className="p-8 text-center text-red-400">Error: {error.message}</main>;
}
