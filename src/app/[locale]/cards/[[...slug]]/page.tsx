"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCardsBySetAndCode } from "@/apis/cards/endpoints";

export default function CardDetailsPage() {
  const params = useParams();

  const { data, isLoading, error, status } = useQuery({
    queryFn: async ({ signal }) =>
      await getCardsBySetAndCode(params.slug[0], params.slug[1], { signal }),
    queryKey: ["getDeckBySetAndCode"],
    retry: false,
  });

  if (isLoading || status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (error || status !== "success") {
    return <h1>Error! {JSON.stringify(error)}</h1>;
  }

  const imageClassNames =
    data.attributes.orientation.toLowerCase() === "horizontal"
      ? "rotate-90"
      : "";
  return (
    <>
      <h1>Card details</h1>
      <div>{JSON.stringify(data, null, 2)}</div>
      <div className="flex justify-center">
        <img
          className={imageClassNames}
          alt={data.attributes.code}
          src={`http://localhost:5299/assets/images/${data.attributes.code}.png`}
        />
      </div>
    </>
  );
}
