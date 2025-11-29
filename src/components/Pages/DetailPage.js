import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlayer } from "../Api/api";

function DetailPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(()=>{ load(); },[]);

  async function load() {
    const data = await getPlayer(id);
    setPlayer(data);
  }

  if (!player) return <p>Loading...</p>

  return (
    <div className="container">
      <h2>Player Detail</h2>
      <p>이름: {player.name}</p>
      <p>출생연도: {player.birthYear}</p>
      <p>팀: {player.team}</p>

      <Link to={`/update/${id}`} className="btn btn-primary">수정</Link>
      <Link to="/list" className="btn btn-secondary">취소</Link>
    </div>
  );
}

export default DetailPage;