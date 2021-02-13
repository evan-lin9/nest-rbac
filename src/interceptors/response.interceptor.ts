import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponse<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    const r = Reflect.getMetadata(
      'OVERRIDE_RESPONSE_TRANSFORM_METADATA',
      context.getHandler(),
    );
    // 用来处理导出的流式数据
    if (r) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return next.handle().pipe();
    }

    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: 'success',
        data,
      })),
    );
  }
}
