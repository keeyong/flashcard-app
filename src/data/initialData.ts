import { Deck, Card } from '../types';

// 초기 여행(Travel) 덱
export const initialDecks: Deck[] = [
  {
    id: 'travel',
    title: '여행(Travel)',
    size: 20,
  },
];

// 여행 덱의 카드들
export const initialCards: Card[] = [
  { id: 't1', deckId: 'travel', front_en: 'passport', back_ko: '여권' },
  { id: 't2', deckId: 'travel', front_en: 'boarding pass', back_ko: '탑승권' },
  { id: 't3', deckId: 'travel', front_en: 'customs', back_ko: '세관' },
  { id: 't4', deckId: 'travel', front_en: 'baggage claim', back_ko: '수하물 찾는 곳' },
  { id: 't5', deckId: 'travel', front_en: 'gate', back_ko: '탑승구' },
  { id: 't6', deckId: 'travel', front_en: 'departure', back_ko: '출발' },
  { id: 't7', deckId: 'travel', front_en: 'arrival', back_ko: '도착' },
  { id: 't8', deckId: 'travel', front_en: 'luggage', back_ko: '짐' },
  { id: 't9', deckId: 'travel', front_en: 'flight', back_ko: '비행' },
  { id: 't10', deckId: 'travel', front_en: 'terminal', back_ko: '터미널' },
  { id: 't11', deckId: 'travel', front_en: 'reservation', back_ko: '예약' },
  { id: 't12', deckId: 'travel', front_en: 'hotel', back_ko: '호텔' },
  { id: 't13', deckId: 'travel', front_en: 'ticket', back_ko: '티켓' },
  { id: 't14', deckId: 'travel', front_en: 'destination', back_ko: '목적지' },
  { id: 't15', deckId: 'travel', front_en: 'visa', back_ko: '비자' },
  { id: 't16', deckId: 'travel', front_en: 'currency', back_ko: '통화' },
  { id: 't17', deckId: 'travel', front_en: 'exchange', back_ko: '환전' },
  { id: 't18', deckId: 'travel', front_en: 'tourist', back_ko: '관광객' },
  { id: 't19', deckId: 'travel', front_en: 'guide', back_ko: '가이드' },
  { id: 't20', deckId: 'travel', front_en: 'map', back_ko: '지도' },
];

