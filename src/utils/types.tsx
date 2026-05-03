export type TtsVoice = {
  language: string;
  region: string;
  name: string;
  isSelected: boolean;
};

export type ConversationContent = {
  user: string;
  thinking: string;
  tool: string;
  assistant: string;
}

export type LoginResponse = {
  username: string;
  selectedEndpointUrl: string;
  endpoints: Endpoint[];
}

export type LoginRequest = {
  username: string;
  endpoint: Endpoint;
}

export type SyncData = {
  username: string;
  backendEndpoints: Endpoint[];
}

export type Endpoint = {
  url: string;
  isSelected: boolean;
}

