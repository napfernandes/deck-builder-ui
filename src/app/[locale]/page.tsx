'use client';

import { FormEvent, SetStateAction, useState } from 'react';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useStaticTranslations } from '@/hooks/use-static-translations';

export default function HomePage() {
  const router = useRouter();
  const t = useStaticTranslations();
  const [searchText, setSearchText] = useState<string>('');

  const onChangeSearch = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }

  const onSearchCards = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/search?' + new URLSearchParams({ query: searchText }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24" style={{
      // backgroundImage: "url(/assets/images/background.webp)",
      // opacity: 0.8
    }}>
      <h1>{t.home.mainTitle}</h1>

      <form className='mt-12' onSubmit={onSearchCards}>
        <h4>{t.home.searchCardsTitle}:</h4>
        <Input type='text' onChange={onChangeSearch} />
        <Button type='default' htmlType='submit' className='primary'>{t.home.searchCardsButton}</Button>
      </form>

    </div>);
}
