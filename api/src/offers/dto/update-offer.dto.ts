import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { OfferStatus } from '../types/offer.type';
import { CreateOfferDto } from './create-offer.dto';

export class UpdateOfferDto extends PartialType(
  OmitType(CreateOfferDto, ['type', 'categoryId', 'startPrice']),
) {
  @ApiProperty({
    type: 'string',
    example: '1c52a84f-3f23-4335-a5df-ea198637e634',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  id: string;

  @ApiProperty({
    enum: OfferStatus,
    example: OfferStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(OfferStatus, { message: 'Must be an OfferStatus enum' })
  status?: OfferStatus;
}
