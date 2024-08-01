"use client";

import { useQuery } from "@tanstack/react-query";
import { getDecks } from "@/apis/decks/endpoints";

export default function DeckListPage() {
  const { data, isLoading, error, status } = useQuery({
    queryFn: async ({ signal }) => await getDecks({ signal }),
    queryKey: ["getDecks"],
    retry: false,
  });

  if (isLoading || status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (error || status !== "success") {
    return <h1>Error! {JSON.stringify(error)}</h1>;
  }

  return (
    <>
      <h1>Decks list</h1>
      <div>{JSON.stringify(data, null, 2)}</div>
    </>
  );
}
