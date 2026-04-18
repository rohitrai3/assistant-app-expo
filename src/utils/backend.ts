import { LoginRequest, LoginResponse } from "./types";

export async function login(request: LoginRequest): Promise<LoginResponse | null> {
  console.log("Logging in...");
  console.log("username:", request.username);
  console.log("backend:", request.endpoint);

  const response = await fetch(`${request.endpoint}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then(res => res.json())
    .then(data => data.data)
    .catch(err => console.log("Login failed:", err));

  console.log("response:", response);

  return response ? response : null;
}

export async function ping(backend: string): Promise<boolean> {
  const response = await fetch(`${backend}/ping`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error("Ping failed:", err));

  return response ? true : false;
}

