import { useState, useRef } from "react";
import { createPlayer } from "../Api/api";
import { useNavigate } from "react-router-dom";

function CreatePage() {
    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [position, setPosition] = useState("");
    const [birthYear, setBirthYear] = useState("");

    const nameRef = useRef(null);
    const teamRef = useRef(null);
    const positionRef = useRef(null);
    const birthYearRef = useRef(null);

    const navigate = useNavigate();

    function validate() {
        if (!name.trim()) {
        alert("이름을 입력하세요");
        nameRef.current.focus();
        return false;
        }
        if (!team.trim()) {
        alert("팀을 입력하세요");
        teamRef.current.focus();
        return false;
        }
        if (!position.trim()) {
        alert("포지션을 입력하세요");
        positionRef.current.focus();
        return false;
        }
        if (!birthYear || Number.isNaN(Number(birthYear))) {
        alert("출생연도를 입력하세요");
        birthYearRef.current.focus();
        return false;
        }
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        await createPlayer({ name, team, position, birthYear });
        navigate("/list");
    }

    return (
        <div className="container">
        <h1>Create Player</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
            <label>이름</label>
            <input
                ref={nameRef}
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label>팀</label>
            <input
                ref={teamRef}
                className="form-control"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label>포지션</label>
            <input
                ref={positionRef}
                className="form-control"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label>출생연도</label>
            <input
                ref={birthYearRef}
                className="form-control"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
            />
            </div>

            <button className="btn btn-primary" type="submit">
            생성하기
            </button>
        </form>
        </div>
    );
}

export default CreatePage;
