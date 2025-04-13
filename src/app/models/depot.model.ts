export interface Depot {
  id: number;
  name: string;
  url: string;
  username: string;
  accountId: number;
  branch?: string | null; // Optional property
}
