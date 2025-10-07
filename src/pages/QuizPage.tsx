import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../store/DataContext';

type QuizMode = 'mcq' | 'fill';

function QuizPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { decks, getCardsByDeckId } = useData();
  const [activeTab, setActiveTab] = useState<QuizMode>('mcq');

  // 덱 정보 가져오기
  const deck = decks.find((d) => d.id === deckId);
  const cards = deckId ? getCardsByDeckId(deckId) : [];

  if (!deckId) {
    return (
      <div>
        <h1 className="page-title">퀴즈</h1>
        <div className="empty-state">
          <p>퀴즈를 풀 덱을 선택해주세요.</p>
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div>
        <h1 className="page-title">퀴즈</h1>
        <div className="empty-state">
          <p>덱을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">{deck.title} 퀴즈</h1>
      
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'mcq' ? 'active' : ''}`}
          onClick={() => setActiveTab('mcq')}
        >
          객관식 (MCQ)
        </button>
        <button
          className={`tab ${activeTab === 'fill' ? 'active' : ''}`}
          onClick={() => setActiveTab('fill')}
        >
          빈칸 채우기 (Fill)
        </button>
      </div>

      {activeTab === 'mcq' && (
        <div className="quiz-section">
          <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>객관식 퀴즈</h2>
          <p style={{ color: '#64748b' }}>
            총 {cards.length}개의 문제가 준비되어 있습니다.
          </p>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
            영어 단어가 제시되면 올바른 한국어 뜻을 선택하세요.
          </p>
        </div>
      )}

      {activeTab === 'fill' && (
        <div className="quiz-section">
          <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>빈칸 채우기 퀴즈</h2>
          <p style={{ color: '#64748b' }}>
            총 {cards.length}개의 문제가 준비되어 있습니다.
          </p>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
            한국어 뜻이 제시되면 영어 단어를 입력하세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizPage;

