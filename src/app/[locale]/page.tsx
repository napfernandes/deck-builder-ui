"use client";

import { FormEvent, SetStateAction, useState } from "react";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useStaticTranslations } from "@/hooks/use-static-translations";

export default function HomePage() {
  const router = useRouter();
  const t = useStaticTranslations();
  const [searchText, setSearchText] = useState<string>("");

  const onChangeSearch = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const onSearchCards = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/search?" + new URLSearchParams({ query: searchText }));
  };

  return (
    <div className="flex flex-col h-full flex-1 relative">
      <div className="bg-no-repeat bg-cover bg-[url(/assets/images/backgrounds/library.jpg)] opacity-60 absolute inset-0 -z-10" />

      <div className="grid grid-cols-3 justify-center">
        <div className="col"></div>
        <div className="col text-center">
          <form
            className="mt-40 space-y-5 text-center"
            onSubmit={onSearchCards}
          >
            <b>{t.home.searchCardsTitle}</b>
            <Input className="mt-5" type="text" onChange={onChangeSearch} />
            <Button type="default" htmlType="submit" className="primary w-full">
              {t.home.searchCardsButton}
            </Button>
          </form>
        </div>
        <div className="col"></div>
      </div>

      {/*  */}
    </div>
  );
}
