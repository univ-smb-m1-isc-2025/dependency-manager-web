export interface ApiResponse<T> {
  status: string; // e.g., 'success', 'error'
  message: string;
  data: T;
  timestamp: string; // Assuming timestamp is always present
}
