import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api.interface';
import { convertStatusCodeToMessage, isSuccessStatusCode, convertMethodToResponseMessage } from '../utils/http.util';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        const statusCode = response.statusCode || 200;

        return {
          success: isSuccessStatusCode(statusCode),
          statusCode,
          statusMessage: convertStatusCodeToMessage(statusCode),
          data,
          message: convertMethodToResponseMessage(request.method, statusCode),
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
