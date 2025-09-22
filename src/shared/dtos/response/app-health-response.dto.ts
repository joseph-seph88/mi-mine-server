import { ApiProperty } from "@nestjs/swagger";

export class AppHealthResponseDto {
    @ApiProperty({ example: 'ok', description: '서버 상태' })
    status: string;

    @ApiProperty({ example: '2025-09-22T10:30:00.000Z', description: '응답 시간' })
    timestamp: string;

    @ApiProperty({ example: 3600, description: '서버 가동 시간(초)' })
    uptime: number;

    @ApiProperty({ example: 25.6, description: '메모리 사용량(MB)' })
    memory: number;
}
