const API_URL = "https://6915406584e8bd126af93aa7.mockapi.io/user";

async function handleResponse(res) {
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function getPlayers() {
  const res = await fetch(API_URL);
  return handleResponse(res);
}

export async function getPlayer(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse(res);
}

export async function createPlayer(player) {
  const payload = { ...player, birthYear: Number(player.birthYear) };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updatePlayer(id, player) {
  const payload = { ...player, birthYear: Number(player.birthYear) };
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deletePlayer(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}