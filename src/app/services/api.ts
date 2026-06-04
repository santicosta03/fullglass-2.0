const API_URL = "http://localhost:8080";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Error en la API");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}