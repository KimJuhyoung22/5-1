import { useEffect, useState } from "react";
import PlayerModal from "../Player/PlayerModal";
import PlayerTable from "../Player/PlayerTable";
import { getPlayers, createPlayer, deletePlayer, updatePlayer } from "../Api/api";
import { useNavigate } from "react-router-dom";

function ListPage() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getPlayers();
    setPlayers(data);
  }

  function openAddModal() {
    setEditingPlayer(null);
    setShowModal(true);
  }

  function openEdit(id) {
    navigate(`/update/${id}`);
  }

  async function handleDelete(id) {
    if (window.confirm("삭제하시겠습니까?")) {
      await deletePlayer(id);
      load();
    }
  }

  async function savePlayer(data) {
    if (editingPlayer) await updatePlayer(editingPlayer.id, data);
    else await createPlayer(data);

    setShowModal(false);
    setEditingPlayer(null);
    load();
  }

  return (
    <div className="container">
      <h1>Soccer Player List</h1>

      <button className="btn btn-primary" onClick={openAddModal}> + Add Player</button>

      <PlayerTable players={players} onEdit={(p)=>openEdit(p.id)} onDelete={handleDelete}/>
      
      <PlayerModal
        show={showModal}
        onClose={()=>setShowModal(false)}
        onSave={savePlayer}
        editingPlayer={editingPlayer}
      />
    </div>
  );
}

export default ListPage;