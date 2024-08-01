"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getDeckById } from "@/apis/decks/endpoints";
import { DeckCardOutput, DeckOutput } from "@/apis/decks/interface";

interface DeckListPageProps {
  deck: DeckOutput;
}

export default function DeckListPage(props: DeckListPageProps) {
  const params = useParams();

  const { data, isLoading, error, status } = useQuery({
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

  return (
    <>
      <h1>Deck list</h1>

      <ul>
        <li>
          <b>Title:</b> {data.title}
        </li>
        <li>
          <b>Description:</b> {data.description}
        </li>
        <li>
          <b>Cards:</b>
          <table className="">
            <thead>
              <tr>
                <th>Card name</th>
                <th>Quantity</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.cards.map((card: DeckCardOutput) => (
                <tr key={card.cardId}>
                  <td>
                    <a
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                      href={`http://localhost:5299/assets/images/${card.details.code}.png`}
                      target="_blank"
                    >
                      {card.details.name.toString()}
                    </a>
                  </td>
                  <td>{card.quantity}</td>
                  <td>{card.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      </ul>
    </>
  );
}
