function PlayerTable({ players, onEdit, onDelete }) {
  if (!players || players.length === 0) return <p>데이터 없음</p>;

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>출생</th>
          <th>팀</th>
          <th>포지션</th>
          <th>액션</th>
        </tr>
      </thead>

      <tbody>
        {players.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.birthYear}</td>
            <td>{p.team}</td>
            <td>{p.position}</td>

            <td>
              <button
                className="btn btn-sm btn-warning me-1"
                onClick={() => onEdit(p)}
              >
                수정
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(p.id)}
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;