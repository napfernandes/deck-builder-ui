"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { CardOutput } from "@/apis/cards/interface";
import { searchCards } from "@/apis/cards/endpoints";
import { useStaticTranslations } from "@/hooks/use-static-translations";
import { SearchCard } from "@/components/search-card";

export default function SearchPage() {
  const t = useStaticTranslations();
  const searchParams = useSearchParams();
  const [outterValue, setOutterValue] = useState<CardOutput>(
    CardOutput.empty()
  );

  const { data, isLoading } = useQuery({
    queryFn: async ({ signal }) =>
      await searchCards(searchParams.get("query") as string, { signal }),
    queryKey: ["searchCards"],
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-cover bg-center">
      <p>{t.search.searchResults(data.length)}</p>
      <div className="mt-4 flex flex-wrap gap-4 content-center">
        {data.map((card: CardOutput) => (
          <SearchCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
