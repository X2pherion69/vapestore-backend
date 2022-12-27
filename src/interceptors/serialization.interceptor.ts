import { PagingResult, ResponseInterface } from './../interfaces';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassContructor {
    new (...args: any[]): object;
}

export function serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((response: ResponseInterface<any>) => {
                if (response.data && <PagingResult<any>>response.data.count !== undefined) {
                    response.data.data = response.data.data.map((data: any) => plainToInstance(this.dto, data, { excludeExtraneousValues: true }));
                } else if (Array.isArray(response.data)) {
                    response.data = response.data.map((data) => plainToInstance(this.dto, data, { excludeExtraneousValues: true }));
                } else {
                    response.data = plainToInstance(this.dto, response.data, { excludeExtraneousValues: true });
                }
                //TODO: Fix status code
                return response.res.status(200).send(response.data);
            }),
        );
    }
}
