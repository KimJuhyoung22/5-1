import { useEffect, useState } from "react";

function PlayerModal({ show, onClose, onSave, editingPlayer }) {
  const [form, setForm] = useState({
    name: "",
    birthYear: "",
    team: "",
    position: "",
  });

  useEffect(() => {
    if (editingPlayer) {
      setForm({
        name: editingPlayer.name ?? "",
        birthYear: editingPlayer.birthYear ?? "",
        team: editingPlayer.team ?? "",
        position: editingPlayer.position ?? "",
      });
    } else {
      setForm({ name: "", birthYear: "", team: "", position: "" });
    }
  }, [editingPlayer]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: show ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {editingPlayer ? "선수 데이터 수정" : "선수 데이터 추가"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={submit}>
            <div className="modal-body">
              <input
                name="name"
                className="form-control mb-2"
                placeholder="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="birthYear"
                className="form-control mb-2"
                placeholder="birthYear"
                type="number"
                value={form.birthYear}
                onChange={handleChange}
                required
              />

              <input
                name="team"
                className="form-control mb-2"
                placeholder="team"
                value={form.team}
                onChange={handleChange}
                required
              />

              <input
                name="position"
                className="form-control mb-2"
                placeholder="position"
                value={form.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose} type="button">
                취소
              </button>
              <button className="btn btn-primary" type="submit">
                저장
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default PlayerModal;