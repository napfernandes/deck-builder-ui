interface SearchCardOptions {
  signal: AbortSignal;
}

export async function searchCards(query: string, options?: SearchCardOptions) {
  
    const response = await fetch(
        "http://localhost:5299/api/v1/cards?" +
          new URLSearchParams({ query }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: options?.signal,
        }
      );
    
      return response.json();
}
