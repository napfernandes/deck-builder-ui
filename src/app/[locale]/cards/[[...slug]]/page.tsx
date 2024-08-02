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
      ? "rotate-90"
      : "";

  return (
    <div className="grid grid-cols-3 text-sm">
      <div className="col"></div>
      <div className="col">
        <div className="mb-10 mt-10">
          <img
            className={`${imageClassNames}`}
            alt={card.attributes.code}
            src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/${card.attributes.code}.png`}
          />
        </div>
        <div>
          <div className="grid grid-rows">
            <div className="font-bold font-harryPotter text-5xl">
              {card.attributes.name}
            </div>

            <div className="grid-cols-2 mb-10">
              <span className="font-bold font-harryPotter text-3xl">
                {card.attributes.type}
              </span>
              <i className="ml-2 text-sm">
                {card.attributes.subType && card.attributes.subType.join(",")}
              </i>

              <CardDetailAttribute
                label={"Card #"}
                value={card.attributes.cardNumber}
              />
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
                isItalic={true}
                value={card.attributes.illustrator}
              />
              {card.attributes.lessonType && (
                <CardDetailAttribute
                  label="Lesson type"
                  altIcon={card.attributes.lessonType}
                  icon={`/assets/images/lessons/${card.attributes.lessonTypeCode}.png`}
                />
              )}

              {card.attributes.lessonCost && (
                <CardDetailAttribute
                  label="Lesson cost"
                  value={card.attributes.lessonCost}
                />
              )}

              <CardDetailAttribute
                label="Action cost"
                value={card.attributes.actionCost}
              />
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
            </div>
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
    <div className="grid grid-cols-2 mb-2">
      <b>{props.label}</b>
      {!props.value ? null : props.isItalic ? (
        <i>{props.value}</i>
      ) : (
        props.value
      )}{" "}
      {props.icon ? (
        <img
          src={props.icon}
          style={{ width: 24, height: 24 }}
          title={props.altIcon ?? props.value}
        />
      ) : null}
    </div>
  );
}
