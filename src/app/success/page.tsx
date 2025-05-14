import { redis } from "@/lib";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ state: string | undefined }>;
}) {
  const state = ((await searchParams) || {})["state"] || undefined;
  if (state) {
    const vp = await redis.get(`waltid-state-${state}`);
    if (vp) {
      return (
        <div className="flex flex-col items-center">
          <div>Success!</div>
          <code className="block max-w-2xl break-words">{vp}</code>
        </div>
      );
    } else {
      return <div>State does not exist!</div>;
    }
  } else {
    return <div>No state search param!</div>;
  }
}
