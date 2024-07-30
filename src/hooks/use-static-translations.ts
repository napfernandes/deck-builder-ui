import { useTranslations } from 'next-intl';

type StaticTranslations = {
  home: {
    mainTitle: string;
    searchCardsTitle: string;
    searchCardsButton: string;
  };
  search: {
    mainTitle: string;
    searchResults: (numberOfCards: number) => string;
  }
};

export function useStaticTranslations(): StaticTranslations {
  const t = useTranslations();

  return {
    home: {
      mainTitle: t('home.mainTitle'),
      searchCardsTitle: t('home.searchCardsTitle'),
      searchCardsButton: t('home.searchCardsButton'),
    },
    search: {
      mainTitle: t('search.mainTitle'),
      searchResults: (numberOfCards) => t('search.searchResults', { numberOfCards }),
    },
  } as StaticTranslations;
}
