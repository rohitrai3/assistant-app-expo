export type SyncData = {
  username: string;
  backendEndpoints: BackendEndpoint[];
}

export type BackendEndpoint = {
  endpoint: string;
  isActive: boolean;
}

