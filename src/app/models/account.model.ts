export interface Account {
  id: number;
  email: string;
  // We don't typically include password in frontend models
  verifiedAt?: string | null; // Represent Date as string (ISO format) or null
  createdAt: string; // Represent Date as string
  updatedAt: string; // Represent Date as string

  // UserDetails properties (usually not sent to frontend,
  // but include if your /me endpoint sends them)
  // authorities?: any[]; // Define more specific type if needed
  // username?: string; // Likely same as email
  // accountNonExpired?: boolean;
  // accountNonLocked?: boolean;
  // credentialsNonExpired?: boolean;
  // enabled?: boolean;
}
