"use client";

import Link from "next/link";
import { Input, InputNumber } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { CardOutput } from "@/apis/cards/interface";
import { useMutation } from "@tanstack/react-query";
import { createDeck } from "@/apis/decks/endpoints";
import { CreateDeckInput } from "@/apis/decks/interface";
import { SearchCardsComponent } from "@/components/search-cards";

interface DeckBuilderPageProps {}

export default function DeckBuilderPage(props: DeckBuilderPageProps) {
  const [deck, setDeck] = useState<CreateDeckInput>({
    ...CreateDeckInput.empty(),
    gameId: "55d2437cef13be2c52c0c9b1",
  });
  const [selectedCard, setSelectedCard] = useState<CardOutput>(
    CardOutput.empty()
  );
  const createDeckMutation = useMutation({
    mutationFn: (input: CreateDeckInput) => createDeck(input),
    mutationKey: ["createDeck"],
  });

  const router = useRouter();

  useEffect(() => {
    if (selectedCard.id) {
      const existingCard = deck.cards.find(
        (card) => card.cardId === selectedCard.id
      );
      if (!existingCard) {
        setDeck({
          ...deck,
          cards: [
            ...deck.cards,
            { cardId: selectedCard.id, quantity: 1, details: selectedCard },
          ],
        });
      }
    }
  }, [selectedCard]);

  const onRemoveCard = (index: number) => {
    const newCards = [...deck.cards];
    newCards.splice(index, 1);
    setDeck({ ...deck, cards: newCards });
  };

  const onSubmitDeck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submittedDeck = {
      ...deck,
      cards: deck.cards.map((card) => ({
        cardId: card.cardId,
        quantity: card.quantity,
        notes: card.notes,
      })),
    };

    const result = await createDeckMutation.mutateAsync(submittedDeck);
    router.push(`/decks/${result.id}`);
  };

  const onChangeQuantity = (quantity: number | null, index: number) => {
    if (!quantity) {
      return;
    }

    const newCards = [...deck.cards];
    newCards[index].quantity = quantity;

    setDeck({ ...deck, cards: newCards });
  };

  const onChangeNotes = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!event.target.value) {
      return;
    }

    const newCards = [...deck.cards];
    newCards[index].notes = event.target.value;

    setDeck({ ...deck, cards: newCards });
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-cover bg-center">
      <h1>Deck Builder</h1>

      <form className="flex flex-col" onSubmit={onSubmitDeck}>
        <div className="flex flex-col">
          <h3>General information</h3>
          <div>
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              name="title"
              value={deck.title}
              onChange={(e) => setDeck({ ...deck, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Input
              name="description"
              value={deck.description}
              onChange={(e) =>
                setDeck({ ...deck, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h3>Cards selection</h3>

          <SearchCardsComponent
            setSelectedValue={setSelectedCard}
            autoClearSearchValue={true}
            allowClear={true}
          />
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Card title</th>
                <th>Quantity</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deck.cards.map((card, index) => (
                <tr key={card.details?.id}>
                  <td>{card.details?.attributes?.cardNumber}</td>
                  <td>
                    <Link
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                      href={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/${card.details?.attributes.code}.png`}
                      target="_blank"
                    >
                      {card.details?.attributes?.name}
                    </Link>
                  </td>
                  <td>
                    <InputNumber
                      max={4}
                      min={1}
                      defaultValue={card.quantity}
                      onChange={(value) => onChangeQuantity(value, index)}
                    />
                  </td>
                  <td>
                    <Input
                      defaultValue={card.notes}
                      onChange={(event) => onChangeNotes(event, index)}
                    />
                  </td>
                  <td>
                    <button
                      className="text-red-700 dark:text-red-500 hover:underline"
                      onClick={() => onRemoveCard(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
