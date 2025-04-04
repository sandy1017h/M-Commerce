export interface ResponseDto<T> {
    [x: string]: any;
    message: string;
    isSuccessed: boolean;
    data: T| null;
}