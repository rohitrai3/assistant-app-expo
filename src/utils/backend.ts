import { state$ } from "./store";
import { Endpoint, LoginRequest, LoginResponse } from "./types";
import { fetch } from "expo/fetch";

export async function login(request: LoginRequest): Promise<LoginResponse | null> {
  console.log("Logging in...");

  const response = await fetch(`${request.endpoint.url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then(res => res.json())
    .then(data => data.data)
    .catch(err => {
      console.log("Login failed:", err);
      state$.notification.set({ content: `Login failed: ${err}`, duration: 1000 });
    });

  console.log("response:", response);

  if (response) {
    response.endpoints = response.endpoints.map((endpoint: Endpoint) => {
      endpoint.isOnline = null;

      return endpoint;
    });

    state$.notification.set({ content: "Login successful", duration: 1000 });
    return response;
  }

  state$.notification.set({ content: "Login failed", duration: 1000 });
  return null;
}

export async function ping(endpointUrl: string): Promise<boolean> {
  const response = await fetch(`${endpointUrl}/ping`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      console.log("Ping failed:", err);
      state$.notification.set({ content: `Ping failed: ${err}`, duration: 1000 });
    });

  return response ? true : false;
}

