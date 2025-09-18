import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
    @ApiProperty({
        example: true,
        description: '성공 여부'
    })
    success: boolean;

    @ApiProperty({
        example: 200/201,
        description: 'HTTP 상태 코드'
    })
    statusCode: number;

    @ApiProperty({
        example: 'OK',
        description: '상태 메시지'
    })
    statusMessage: string;

    @ApiProperty({
        example: '요청이 성공적으로 처리되었습니다',
        description: '응답 메시지'
    })
    message: string;

    @ApiProperty({
        description: '응답 데이터'
    })
    data: T;

    @ApiProperty({
        example: '2025-09-18T10:30:00.000Z',
        description: '응답 시간'
    })
    timestamp: string;
}