import { useNavigate } from 'react-router-dom';
import { useData } from '../store/DataContext';

function HomePage() {
  const navigate = useNavigate();
  const { decks, getCardsByDeckId } = useData();

  const handleDeckClick = (deckId: string) => {
    navigate(`/study/${deckId}`);
  };

  return (
    <div>
      <h1 className="page-title">플래시카드 학습</h1>
      {decks.length === 0 ? (
        <div className="empty-state">
          <p>사용 가능한 덱이 없습니다.</p>
        </div>
      ) : (
        <div className="deck-list">
          {decks.map((deck) => {
            const cardCount = getCardsByDeckId(deck.id).length;
            return (
              <div
                key={deck.id}
                className="deck-card"
                onClick={() => handleDeckClick(deck.id)}
              >
                <h2 className="deck-title">{deck.title}</h2>
                <p className="deck-info">{cardCount}개의 카드</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;

