import { RequestOptions } from "../interface";

export async function getDeckById(id: string, options?: RequestOptions) {
  const result = await fetch(`http://localhost:5299/api/v1/decks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal: options?.signal,
  });

  const response = await result.json();

  if (!result.ok) {
    throw response;
  }

  return response;
}

export async function getDecks(options?: RequestOptions) {
  const result = await fetch(`http://localhost:5299/api/v1/decks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal: options?.signal,
  });

  const response = await result.json();

  if (!result.ok) {
    throw response;
  }

  return response;
}