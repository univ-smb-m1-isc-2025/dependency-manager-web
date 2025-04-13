export interface Dependency {
  name: string;
  current: string;
  latest?: string; // Optional, as it might not be set initially or detected
}
