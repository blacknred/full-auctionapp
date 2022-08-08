import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

import { OffsetPaginationDto } from '../../../__shared__/dto/request.dto';

export class GetNotificationsDto extends OffsetPaginationDto {
  @ApiProperty({
    type: 'string',
    required: false,
    example: '1c52a84f-3f23-4335-a5df-ea198637e634',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  offerId?: string;
}
