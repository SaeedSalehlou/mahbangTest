export interface BaseResponseModel<T> {
  status: string;
  message: string
  data: T;
}
