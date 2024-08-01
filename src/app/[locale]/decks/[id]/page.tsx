"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getDeckById } from "@/apis/decks/endpoints";
import { DeckCardOutput, DeckOutput } from "@/apis/decks/interface";

interface DeckListPageProps {
  deck: DeckOutput;
}

export default function DeckListPage(props: DeckListPageProps) {
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
    <>
      <h1>Deck list</h1>

      <ul className="mt-8">
        <li>
          <b>Title:</b> {deck.title}
        </li>
        <li>
          <b>Description:</b> {deck.description}
        </li>
        <li className="mt-8">
          <b>Cards:</b>

          {cardTypes.map((cardType: string) => {
            const filteredCards = deck.cards.filter((card: DeckCardOutput) => {
              return card.details.type === cardType;
            });

            return (
              <div className="mt-6">
                <b>{cardType}</b>
                <div className="mt-4">
                  {filteredCards.map((card: DeckCardOutput) => {
                    return (
                      <p>
                        {card.quantity}x{" "}
                        <Link
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                          href={`/cards/${card.details.setCode}/${card.details.code}`}
                        >
                          {card.details.name}
                        </Link>
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </li>
      </ul>
    </>
  );
}
