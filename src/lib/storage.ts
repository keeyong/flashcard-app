import { Deck, Card, AggregateStats, SessionRecord } from '../types';

// localStorage 키
const STORAGE_KEYS = {
  DECKS: 'fc.decks',
  CARDS: 'fc.cards',
  STATS: 'fc.stats',
  LAST_SESSION: 'fc.lastSession',
} as const;

// Decks
export const loadDecks = (): Deck[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.DECKS);
  return stored ? JSON.parse(stored) : [];
};

export const saveDecks = (decks: Deck[]): void => {
  localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(decks));
};

// Cards
export const loadCards = (): Card[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.CARDS);
  return stored ? JSON.parse(stored) : [];
};

export const saveCards = (cards: Card[]): void => {
  localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
};

// Stats
export const loadStats = (): AggregateStats => {
  const stored = localStorage.getItem(STORAGE_KEYS.STATS);
  return stored
    ? JSON.parse(stored)
    : { totalAnswered: 0, totalCorrect: 0, perDeck: {} };
};

export const saveStats = (stats: AggregateStats): void => {
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
};

// Last Session
export const loadLastSession = (): SessionRecord | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.LAST_SESSION);
  return stored ? JSON.parse(stored) : null;
};

export const saveLastSession = (session: SessionRecord | null): void => {
  if (session) {
    localStorage.setItem(STORAGE_KEYS.LAST_SESSION, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEYS.LAST_SESSION);
  }
};

