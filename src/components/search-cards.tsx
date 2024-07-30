import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { searchCards } from '@/apis/search-cards';
import { CardOutput } from '@/apis/cards/interface';

export type SearchCardsComponentProps = AutoCompleteProps & {
  setSelectedValue?: Dispatch<SetStateAction<CardOutput>>;
}
export function SearchCardsComponent(props: SearchCardsComponentProps) {
    const [query, setQuery] = useState<string>('');
    const { setSelectedValue, ...propsList } = props;
    const [options, setOptions] = useState<SearchCardsComponentProps['options']>(props.options);

    const { data, refetch } = useQuery({
      queryKey: ['searchCards', query],
      enabled: false,
      queryFn: async () => {
        const searchResult = await searchCards(query);

        setOptions(searchResult
          .sort((a: CardOutput, b: CardOutput) => b.attributes.name > a.attributes.name)
          .map((card: any) => ({
            label: (
              <span><b>#{card.attributes.cardNumber}</b><span>{card.attributes.name}</span></span>
            ),
            value: card.attributes.name,
            card,
          }))
        );
      },
    })

    useEffect(() => {
      if (query) {
        refetch();
      }
    }, [query]);

    const onSelect = (data: string, option: any) => {
      props.setSelectedValue?.(option.card);
    };

    return (
      <AutoComplete
        {...propsList}
        options={options}
        onSelect={onSelect}
        onSearch={setQuery}
        placeholder="input here"
      />
    );
}
