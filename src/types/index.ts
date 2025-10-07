// 데이터 타입 정의
export type Deck = {
  id: string;
  title: string;
  size: number;
};

export type Card = {
  id: string;
  deckId: string;
  front_en: string;
  back_ko: string;
};

export type Attempt = {
  cardId: string;
  mode: 'study' | 'mcq' | 'fill';
  result: 'correct' | 'incorrect';
};

export type SessionRecord = {
  sessionId: string;
  deckId: string;
  attempts: Attempt[];
  unknownCardIds: string[];
};

export type AggregateStats = {
  totalAnswered: number;
  totalCorrect: number;
  perDeck: Record<string, { answered: number; correct: number }>;
};

