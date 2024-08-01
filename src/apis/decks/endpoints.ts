import { RequestOptions } from "../interface";
import { CreateDeckInput } from "./interface";

export async function getDeckById(id: string, options?: RequestOptions) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/decks/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: options?.signal,
    }
  );

  const response = await result.json();

  if (!result.ok) {
    throw response;
  }

  return response;
}

export async function getDecks(options?: RequestOptions) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/decks`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: options?.signal,
    }
  );

  const response = await result.json();

  if (!result.ok) {
    throw response;
  }

  return response;
}

export async function createDeck(deck: CreateDeckInput) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/decks`,
    {
      method: "POST",
      body: JSON.stringify(deck),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const response = await result.json();

  if (!result.ok) {
    throw response;
  }

  return response;
}
