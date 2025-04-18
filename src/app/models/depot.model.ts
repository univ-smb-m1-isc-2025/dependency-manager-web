export interface Depot {
  id?: number;
  name: string;
  url: string;
  token: string;
  username: string;
  accountId: number;
  branch?: string | null;
  gitIconUrl?: string | null;
  lastDependenciesUpdate?: Date | null;
}
