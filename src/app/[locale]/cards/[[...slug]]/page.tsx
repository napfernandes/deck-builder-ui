"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCardsBySetAndCode } from "@/apis/cards/endpoints";

export default function CardDetailsPage() {
  const params = useParams();

  const {
    data: card,
    isLoading,
    error,
    status,
  } = useQuery({
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
    card.attributes.orientation.toLowerCase() === "horizontal"
      ? "hover:rotate-90"
      : "";
  return (
    <div className="flex flex-col">
      <div className=" items-center">
        <h1>{card.attributes.name}</h1>
      </div>

      <div className="mt-4 flex flex-row">
        <div>
          <img
            className={`w-50 ${imageClassNames}`}
            alt={card.attributes.code}
            src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/${card.attributes.code}.png`}
          />
        </div>
        <div className="flex flex-col">
          <div className="section">
            <h1>Basic Information</h1>
            <ul>
              <CardDetailAttribute
                label="Card #"
                value={card.attributes.cardNumber}
              />
              <CardDetailAttribute label="Type" value={card.attributes.type} />
              <CardDetailAttribute
                label="Set"
                altIcon={card.attributes.set}
                icon={`/assets/images/sets/${card.attributes.setCode}.png`}
              />
              <CardDetailAttribute
                label="Rarity"
                value={card.attributes.rarity}
              />
              <CardDetailAttribute
                label="Illustrator"
                value={card.attributes.illustrator}
              />
              {card.attributes.lessonType && (
                <CardDetailAttribute
                  label="Lesson type"
                  altIcon={card.attributes.lessonType}
                  icon={`/assets/images/lessons/${card.attributes.lessonTypeCode}.png`}
                />
              )}
              <CardDetailAttribute
                label="Lesson cost"
                value={card.attributes.lessonCost}
              />
              <CardDetailAttribute
                label="Action cost"
                value={card.attributes.actionCost}
              />
              <CardDetailAttribute
                label="Sub type(s)"
                value={card.attributes.subType}
              />
            </ul>
          </div>

          <div className="section mt-10">
            <h1>Rules and flavor text</h1>
            <ul>
              {card.attributes.text && (
                <CardDetailAttribute
                  label="Text"
                  value={card.attributes.text}
                />
              )}
              {card.attributes.flavorText && (
                <CardDetailAttribute
                  isItalic={true}
                  label="Flavor text"
                  value={card.attributes.flavorText}
                />
              )}
              {card.attributes.effect && (
                <CardDetailAttribute
                  label="Effect"
                  value={card.attributes.effect}
                />
              )}
              {card.attributes.toSolve && (
                <CardDetailAttribute
                  label="To solve"
                  value={card.attributes.toSolve}
                />
              )}
              {card.attributes.note && (
                <CardDetailAttribute
                  label="Note"
                  value={card.attributes.note}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardDetailAttributeProps {
  label: string;
  icon?: string;
  value?: string;
  altIcon?: string;
  isItalic?: boolean;
}

function CardDetailAttribute(props: CardDetailAttributeProps) {
  if (!props.value && !props.icon) {
    return null;
  }

  return (
    <li className="flex flex-row gap-10">
      <b>{props.label}</b>
      <span className="flex flex-row gap-2">
        {!props.value ? null : props.isItalic ? (
          <i>{props.value}</i>
        ) : (
          props.value
        )}{" "}
        {props.icon ? (
          <img src={props.icon} title={props.altIcon ?? props.value} />
        ) : null}
      </span>
    </li>
  );
}
