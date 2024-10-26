export interface IHttpRequestConfig {
  server: {
    api: string;
    baseUrl: string;
    version: string;
    headers: Record<string, any>;
  };
}

export interface IExtraConfig {
  apiVersion: string;
  headers: Record<string, any>;
}

export interface IHttpResponse<T = any> {
  statusCode: number;
  data: T | null;
  success: boolean;
  message: string;
  metadata?: any;
}
