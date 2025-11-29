import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPlayer, updatePlayer } from "../Api/api";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    birthYear: "",
    team: "",
    position: "",
  });

  const [editCount, setEditCount] = useState(0);

  const [loaded, setLoaded] = useState(false);

  const nameRef = useRef(null);
  const birthYearRef = useRef(null);
  const teamRef = useRef(null);
  const positionRef = useRef(null);

  useEffect(() => {
    async function load() {
      const p = await getPlayer(id);
      setForm({
        name: p.name ?? "",
        birthYear: String(p.birthYear ?? ""),
        team: p.team ?? "",
        position: p.position ?? "",
      });
      setLoaded(true);
    }
    load();
  }, [id]);

  async function handleChange(e) {
    const { name, value } = e.target;

    const newForm = { ...form, [name]: value };
    setForm(newForm);

    if (!loaded) return;

    setEditCount((prev) => prev + 1);

    const payload = {
      ...newForm,
      birthYear: Number(newForm.birthYear),
    };

    try {
      await updatePlayer(id, payload);
    } catch (err) {
      console.error(err);
      alert("수정 저장 중 오류가 발생했습니다.");
    }
  }

  function validate() {
    if (!form.name.trim()) {
      alert("이름을 입력하세요.");
      nameRef.current?.focus();
      return false;
    }
    if (!form.birthYear || isNaN(Number(form.birthYear))) {
      alert("출생연도는 숫자로 입력하세요.");
      birthYearRef.current?.focus();
      return false;
    }
    if (!form.team.trim()) {
      alert("팀을 입력하세요.");
      teamRef.current?.focus();
      return false;
    }
    if (!form.position.trim()) {
      alert("포지션을 입력하세요.");
      positionRef.current?.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    navigate("/list");
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2>Update Player</h2>

      <p>
        이 페이지에서 총 <strong>{editCount}</strong> 회 수정되었습니다.
      </p>

      <input
        name="name"
        ref={nameRef}
        value={form.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        name="birthYear"
        ref={birthYearRef}
        value={form.birthYear}
        onChange={handleChange}
        placeholder="출생연도"
      />
      <input
        name="team"
        ref={teamRef}
        value={form.team}
        onChange={handleChange}
        placeholder="팀"
      />
      <input
        name="position"
        ref={positionRef}
        value={form.position}
        onChange={handleChange}
        placeholder="포지션"
      />

      <button className="btn btn-primary" type="submit">
        목록으로
      </button>
    </form>
  );
}

export default UpdatePage;
