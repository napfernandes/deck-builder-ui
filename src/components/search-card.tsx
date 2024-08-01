import Link from "next/link";

import { CardOutput } from "@/apis/cards/interface";

interface SearchCardProps {
  card: CardOutput;
}

export function SearchCard({ card }: SearchCardProps) {
  const rotateClass =
    card.attributes.orientation.toLowerCase() === "horizontal"
      ? "hover:rotate-90"
      : "";

  return (
    <div>
      <Link href={`/cards/${card.attributes.setCode}/${card.attributes.code}`}>
        <img
          className={`w-60 ${rotateClass}`}
          alt={card.attributes.code}
          src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/${card.attributes.code}.png`}
        />
      </Link>
    </div>
  );
}
