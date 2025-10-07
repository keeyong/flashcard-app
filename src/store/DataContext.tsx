import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Deck, Card, AggregateStats } from '../types';
import { loadDecks, loadCards, loadStats, saveDecks, saveCards } from '../lib/storage';
import { initialDecks, initialCards } from '../data/initialData';

interface DataContextType {
  decks: Deck[];
  cards: Card[];
  stats: AggregateStats;
  getCardsByDeckId: (deckId: string) => Card[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [stats, setStats] = useState<AggregateStats>({
    totalAnswered: 0,
    totalCorrect: 0,
    perDeck: {},
  });

  // 초기 데이터 로딩
  useEffect(() => {
    let loadedDecks = loadDecks();
    let loadedCards = loadCards();

    // 데이터가 없으면 초기 데이터 주입
    if (loadedDecks.length === 0) {
      loadedDecks = initialDecks;
      saveDecks(loadedDecks);
    }
    if (loadedCards.length === 0) {
      loadedCards = initialCards;
      saveCards(loadedCards);
    }

    setDecks(loadedDecks);
    setCards(loadedCards);
    setStats(loadStats());
  }, []);

  const getCardsByDeckId = (deckId: string): Card[] => {
    return cards.filter((card) => card.deckId === deckId);
  };

  return (
    <DataContext.Provider value={{ decks, cards, stats, getCardsByDeckId }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

