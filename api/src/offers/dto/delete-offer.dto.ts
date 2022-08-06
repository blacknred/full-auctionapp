import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class DeleteOfferDto {
  @ApiProperty({
    type: 'string',
    example: '1c52a84f-3f23-4335-a5df-ea198637e634',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  id: string;
}
