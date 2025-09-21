import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostRadiusRequestDto {
    @ApiProperty({
        example: 1000,
        description: '위도'
    })
    @IsNotEmpty({ message: '위도은 필수 입력 항목입니다.' })
    @IsNumber({}, { message: '위도은 숫자이어야 합니다.' })
    latitude: number;

    @ApiProperty({
        example: 1000,
        description: '경도'
    })
    @IsNotEmpty({ message: '경도은 필수 입력 항목입니다.' })
    @IsNumber({}, { message: '경도은 숫자이어야 합니다.' })
    longitude: number;

    @ApiProperty({
        example: 1000,
        description: '줌'
    })
    @IsNotEmpty({ message: '줌은 필수 입력 항목입니다.' })
    @IsNumber({}, { message: '줌은 숫자이어야 합니다.' })
    zoom: number;


    @ApiProperty({ example: 1000, description: '검색 반경 (미터)' })
    @IsNumber()
    @IsNotEmpty()
    searchRadius: number;
}