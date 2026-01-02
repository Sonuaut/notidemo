export interface IPaginationMeta {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
    totalOutward: number;
    totalInward: number;
  }
  export interface IResponse {
    data: any;
    meta: IPaginationMeta;
  }
  
  export interface QueryParameters {
    [key: string]: string | undefined | string[];
  }
  
  export interface IPaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  export interface IApiError {
    message: string;
    details?: any;
  }
  
  export interface ILibApiResponse<T> {
    status: number;
    data: T;
    meta: {
      pagination: IPaginationMeta;
    };
    error: IApiError | null;
  }