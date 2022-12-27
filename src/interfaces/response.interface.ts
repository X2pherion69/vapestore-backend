import { Response } from 'express';
export interface ResponseInterface<T> {
    res: Response;
    data: T | T[];
}
