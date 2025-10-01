export interface IApiResponse<T> {
  cd: number;
  data?: T;
  err?: string;
  ext?: object;
  msg?: string;
}

export interface ApiErrorResponse {
  cd: number;
  err: string;
  ext: {
    path: string;
    timestamp: string;
  };
  msg: string;
}

export class ApiError extends Error {
  public readonly response: ApiErrorResponse;

  constructor(response: ApiErrorResponse) {
    super(response.msg);
    this.name = 'ApiError';
    this.response = response;
  }
}
