import { redirect } from "next/navigation";

export default function PolicyAlias({ params }: { params: { page: string } }) {
  const map: Record<string, string> = {
    returns: "returns",
    terms: "terms",
    privacy: "privacy",
    exchange: "returns",
  };
  redirect(`/legal/${map[params.page] ?? "terms"}`);
}
