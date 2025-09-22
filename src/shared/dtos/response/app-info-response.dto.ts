import { ApiProperty } from "@nestjs/swagger";

export class AppInfoResponseDto {
    @ApiProperty({ example: 'MiMine Server', description: '애플리케이션 이름' })
    name: string;

    @ApiProperty({ example: '1.0.0', description: '버전' })
    version: string;

    @ApiProperty({ example: 'development', description: '환경' })
    environment: string;

    @ApiProperty({ example: 3001, description: '포트' })
    port: number;
}