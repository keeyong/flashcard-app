import { useParams } from 'react-router-dom';
import { useData } from '../store/DataContext';

function StudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { decks, getCardsByDeckId } = useData();

  // 덱 정보 가져오기
  const deck = decks.find((d) => d.id === deckId);
  const cards = deckId ? getCardsByDeckId(deckId) : [];

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

  return (
    <div>
      <h1 className="page-title">{deck.title} 학습</h1>
      <div className="card-container">
        <div className="card-progress">
          카드 0 / {cards.length}
        </div>
        <div className="card-content">
          학습을 시작하려면 카드를 클릭하세요
        </div>
        <p style={{ color: '#64748b', marginTop: '1rem' }}>
          총 {cards.length}개의 카드가 준비되어 있습니다
        </p>
      </div>
    </div>
  );
}

export default StudyPage;

