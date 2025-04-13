export interface Depot {
  id: number;
  name: string;
  url: string;
  username: string;
  token: string; // Be cautious with handling/storing tokens
  accountId: number;
  branch?: string | null; // Optional property
}
