export type ConversationContent = {
  user: string;
  thinking: string;
  tool: string;
  assistant: string;
}

export type LoginResponse = {
  username: string;
  activeEndpoint: string;
  endpoints: string[];
}

export type LoginRequest = {
  username: string;
  endpoint: string;
}

export type SyncData = {
  username: string;
  backendEndpoints: BackendEndpoint[];
}

export type BackendEndpoint = {
  endpoint: string;
  isActive: boolean;
}

