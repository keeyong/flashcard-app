import { useData } from '../store/DataContext';

function StatsPage() {
  const { stats } = useData();

  const accuracy =
    stats.totalAnswered > 0
      ? ((stats.totalCorrect / stats.totalAnswered) * 100).toFixed(1)
      : '0.0';

  return (
    <div>
      <h1 className="page-title">통계</h1>
      <div style={{ background: 'white', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1e293b' }}>전체 통계</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <span style={{ color: '#64748b' }}>총 답변 수: </span>
            <strong style={{ fontSize: '1.2rem', color: '#1e293b' }}>{stats.totalAnswered}</strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>정답 수: </span>
            <strong style={{ fontSize: '1.2rem', color: '#16a34a' }}>{stats.totalCorrect}</strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>오답 수: </span>
            <strong style={{ fontSize: '1.2rem', color: '#dc2626' }}>
              {stats.totalAnswered - stats.totalCorrect}
            </strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>정확도: </span>
            <strong style={{ fontSize: '1.2rem', color: '#2563eb' }}>{accuracy}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;

