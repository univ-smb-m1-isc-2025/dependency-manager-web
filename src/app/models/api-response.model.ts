export interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  data: any;
}
