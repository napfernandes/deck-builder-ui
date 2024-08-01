import { RequestOptions } from "../interface";

export async function getCardsBySetAndCode(
  setCode: string,
  code: string,
  options?: RequestOptions
) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sets/${setCode}/cards/${code}`,
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

export async function searchCards(query: string, options?: RequestOptions) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cards?` +
      new URLSearchParams({ query }),
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
