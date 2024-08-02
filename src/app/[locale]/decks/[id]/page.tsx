"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getDeckById } from "@/apis/decks/endpoints";
import { DeckCardOutput, DeckOutput } from "@/apis/decks/interface";

interface DeckListPageProps {}

export default function DeckListPage(_: DeckListPageProps) {
  const params = useParams();

  const {
    data: deck,
    isLoading,
    error,
    status,
  } = useQuery({
    queryFn: async ({ signal }) =>
      await getDeckById(params.id.toString(), { signal }),
    queryKey: ["getDeckById"],
    retry: false,
  });

  if (isLoading || status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (error || status !== "success") {
    return <h1>Error! {JSON.stringify(error)}</h1>;
  }

  const cardTypes = Array.from(
    new Set(deck.cards.map((card: DeckCardOutput) => card.details.type))
  ) as string[];

  return (
    <div className="grid grid-cols-3 text-sm">
      <div className="col"></div>
      <div className="col text-sm mt-10">
        <div className="text-center">
          <b className="font-harryPotter text-4xl">{deck.title}</b>
          <p>{deck.description}</p>
          <p>
            Created by: <b>{deck.createdByUser.fullName}</b>
          </p>
        </div>

        <p className="mt-10">
          <b>{deck.cards.length} card(s)</b>
        </p>

        {cardTypes.map((cardType: string) => {
          const filteredCards = deck.cards.filter((card: DeckCardOutput) => {
            return card.details.type === cardType;
          });

          return (
            <div className="grid grid-rows-1 mt-4">
              <div className="col">
                <p>
                  <span className="font-harryPotter text-2xl">{cardType}</span>{" "}
                  ({filteredCards.length})
                </p>

                <div className="grid grid-cols">
                  {filteredCards.map((card: DeckCardOutput) => {
                    return (
                      <span>
                        {card.quantity}x{" "}
                        <Link
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                          href={`/cards/${card.details.setCode}/${card.details.code}`}
                        >
                          {card.details.name}
                        </Link>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col"></div>
    </div>
  );
}
