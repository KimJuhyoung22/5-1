import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://6915406584e8bd126af93aa7.mockapi.io/user";

function App() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ name: "", birthYear: "", team: "", position: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPlayers(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name,
      birthYear: Number(form.birthYear),
      team: form.team,
      position: form.position
    };

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    setForm({ name: "", birthYear: "", team: "", position: "" });
    setEditingId(null);
    fetchPlayers();
  }

  function handleEdit(player) {
    setForm({
      name: player.name,
      birthYear: player.birthYear,
      team: player.team,
      position: player.position
    });
    setEditingId(player.id);
  }

  async function handleDelete(id) {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchPlayers();
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", birthYear: "", team: "", position:"" });
  }

  return (
    <div className="container">
      <h1>Soccer Player CRUD</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="name" value={form.name} onChange={handleChange} required />
        <input name="birthYear" placeholder="birthYear" type="number" value={form.birthYear} onChange={handleChange} required />
        <input name="team" placeholder="team" value={form.team} onChange={handleChange} required />
        <input name="position" placeholder="position" value={form.position} onChange={handleChange} required />

        <button type="submit">{editingId ? "수정 완료" : "추가"}</button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={cancelEdit}>
            수정 취소
          </button>
        )}
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>이름</th><th>출생</th><th>팀</th><th>포지션</th><th>액션</th>
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
                <button onClick={() => handleEdit(p)}>수정</button>
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {players.length === 0 && <p>데이터 없음</p>}
    </div>
  );
}

export default App;
