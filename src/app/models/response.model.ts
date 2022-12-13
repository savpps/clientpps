export interface ResponseModel<T> {
    data: T;
    message: string;
    status: string;
    statusCode: number;
}