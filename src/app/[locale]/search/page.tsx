"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { searchCards } from "@/apis/search-cards";
import { CardOutput } from "@/apis/cards/interface";
import { SearchCardsComponent } from "@/components/search-cards";
import { useStaticTranslations } from "@/hooks/use-static-translations";

export default function SearchPage() {
  const t = useStaticTranslations();
  const searchParams = useSearchParams();
  const [outterValue, setOutterValue] = useState<CardOutput>(CardOutput.empty());

  useEffect(() => {
    console.log({ outterValue})
  }, [outterValue]);
  const { data, isLoading } = useQuery({
    queryFn: async ({ signal }) => await searchCards(searchParams.get('query') as string, { signal }),
    queryKey: ["searchCards"],
  });

  if (isLoading) {
    return null;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center p-24 bg-cover bg-center">
      <h1>{t.search.mainTitle}</h1>
      <p>{t.search.searchResults(data.length)}</p>
      <div>
        <SearchCardsComponent style={{ width: 500 }} setSelectedValue={setOutterValue} />
      </div>
      <div>
        {data.map((card: any) => (
          <div key={card.id} className="flex flex-row gap-2">
            <span>#{card.attributes.cardNumber}</span>
            <span>#{card.language}</span>
            <span>
              <img
                style={{ width: 24, height: 24 }}
                src={`./assets/images/sets/${card.attributes.setCode}.png`}
                alt={card.attributes.setCode} />
            </span>
            <span>{card.attributes.name}</span>
            <span>{card.attributes.rarity}</span>
            <span>{card.attributes.lessonType}</span>

            {card.attributes.lessonTypeCode && (
              <span>
                <img
                  style={{ width: 24, height: 24 }}
                  src={`./assets/images/lessons/${card.attributes.lessonTypeCode}.png`}
                  alt={card.attributes.lessonTypeCode} />
              </span>
            )}
            <img src={`http://localhost:5299/assets/images/${card.attributes.code}.png`} alt={card.attributes.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
