import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../store/DataContext';
import { Attempt } from '../types';

function StudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { decks, getCardsByDeckId } = useData();

  // 덱 정보 가져오기
  const deck = decks.find((d) => d.id === deckId);
  const cards = deckId ? getCardsByDeckId(deckId) : [];

  // 학습 상태
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const currentCard = cards[currentIndex];

  // 세션 시작
  const startSession = () => {
    setIsSessionStarted(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setAttempts([]);
  };

  // 카드 뒤집기
  const flipCard = () => {
    if (isSessionStarted) {
      setIsFlipped(!isFlipped);
    }
  };

  // 정답 처리
  const handleCorrect = () => {
    if (!isFlipped || !currentCard) return;

    const attempt: Attempt = {
      cardId: currentCard.id,
      mode: 'study',
      result: 'correct',
    };
    setAttempts([...attempts, attempt]);
    
    // 다음 카드로 이동
    moveToNextCard();
  };

  // 오답 처리
  const handleIncorrect = () => {
    if (!isFlipped || !currentCard) return;

    const attempt: Attempt = {
      cardId: currentCard.id,
      mode: 'study',
      result: 'incorrect',
    };
    setAttempts([...attempts, attempt]);
    
    // 다음 카드로 이동
    moveToNextCard();
  };

  // 다음 카드로 이동
  const moveToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // 세션 종료 (Phase 2-3에서 구현)
      setIsSessionStarted(false);
    }
  };

  // 스페이스바로 뒤집기
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isSessionStarted) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        flipCard();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSessionStarted, isFlipped]);

  if (!deckId) {
    return (
      <div>
        <h1 className="page-title">학습</h1>
        <div className="empty-state">
          <p>학습할 덱을 선택해주세요.</p>
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div>
        <h1 className="page-title">학습</h1>
        <div className="empty-state">
          <p>덱을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div>
        <h1 className="page-title">{deck.title} 학습</h1>
        <div className="empty-state">
          <p>이 덱에는 카드가 없습니다.</p>
        </div>
      </div>
    );
  }

  // 세션 시작 전 화면
  if (!isSessionStarted) {
    return (
      <div>
        <h1 className="page-title">{deck.title} 학습</h1>
        <div className="card-container">
          <div className="card-content">
            총 {cards.length}개의 카드가 준비되어 있습니다
          </div>
          <button 
            className="button button-primary" 
            onClick={startSession}
            style={{ marginTop: '2rem' }}
          >
            학습 시작
          </button>
          {attempts.length > 0 && (
            <div style={{ marginTop: '2rem', color: '#64748b' }}>
              <p>이전 세션 결과:</p>
              <p>정답: {attempts.filter(a => a.result === 'correct').length}개</p>
              <p>오답: {attempts.filter(a => a.result === 'incorrect').length}개</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 학습 중 화면
  return (
    <div>
      <h1 className="page-title">{deck.title} 학습</h1>
      <div className="card-progress" style={{ marginBottom: '1rem', textAlign: 'center' }}>
        카드 {currentIndex + 1} / {cards.length}
      </div>
      
      <div 
        className="card-container" 
        onClick={flipCard}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <div className="card-content">
          {!isFlipped ? (
            <div>
              <div style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1rem' }}>
                앞면 (영어)
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                {currentCard.front_en}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1rem' }}>
                뒷면 (한국어)
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                {currentCard.back_ko}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginTop: '1rem' }}>
          {!isFlipped ? '카드를 클릭하거나 스페이스를 눌러 뒤집기' : ''}
        </div>
      </div>

      {isFlipped && (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginTop: '2rem' 
        }}>
          <button 
            className="button" 
            onClick={handleIncorrect}
            style={{ 
              backgroundColor: '#dc2626', 
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem'
            }}
          >
            ✗ 틀렸어
          </button>
          <button 
            className="button" 
            onClick={handleCorrect}
            style={{ 
              backgroundColor: '#16a34a', 
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem'
            }}
          >
            ✓ 맞았어
          </button>
        </div>
      )}
    </div>
  );
}

export default StudyPage;

