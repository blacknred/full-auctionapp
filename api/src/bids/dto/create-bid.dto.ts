import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID, MinLength } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({
    type: 'string',
    example: '1c52a84f-3f23-4335-a5df-ea198637e634',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  offerId: string;

  @ApiProperty({ type: 'number', example: 100.25 })
  @IsNumber(null, { message: 'Must be a number' })
  price: string;

  @ApiProperty({ type: 'string', example: 'price comment', required: false })
  @IsOptional()
  @MinLength(1, { message: 'Empty comment' })
  comment?: string;
}
