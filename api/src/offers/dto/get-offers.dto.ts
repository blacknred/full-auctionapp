import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsCurrency,
  IsEnum,
  IsIn,
  IsInstance,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { PaginatedRequestDto } from '../../__shared__/dto/request.dto';
import { OfferType } from '../types/offer.type';

export class GetOffersDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @IsOptional()
  @IsIn(['startPrice', 'blitzPrise', 'createdAt', 'endsAt'], {
    message: 'Must be a one of fields of the Offer entity',
  })
  'sort.field'?: 'startPrice' | 'blitzPrise' | 'createdAt' | 'endsAt';

  //

  @ApiProperty({
    enum: OfferType,
    example: OfferType.SELL,
    required: false,
  })
  @IsOptional()
  @IsEnum(OfferType, { message: 'Must be an OfferType enum' })
  type?: OfferType;

  @ApiProperty({ type: 'string', example: 'Boo', required: false })
  @IsOptional()
  @MinLength(3, { message: 'Must have 3 chars at least' })
  title?: string;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  hasAssets?: boolean;

  @ApiProperty({ type: 'number', example: 1, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  categoryId?: number;

  @ApiProperty({ type: 'string', example: 'USD', required: false })
  @IsOptional()
  @IsCurrency({ message: 'Not valid currency' })
  currency?: string;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isAnonymous?: boolean;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isSingleBid?: boolean;

  //

  @ApiProperty({ type: 'number', example: 100.25, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  startPriceFrom?: number;

  @ApiProperty({ type: 'number', example: 100.25, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  startPriceTo?: number;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  hasBlitzPrice?: boolean;

  @ApiProperty({ type: 'number', example: 30, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  bidderMinRating?: number;

  @ApiProperty({
    type: Map,
    required: false,
    example: {
      author: 'Rudyard Kipling',
      year: '1894',
    },
  })
  @IsOptional()
  @Type(() => URLSearchParams)
  // @Type(() => Date)
  // @Transform(({ value }) => moment(value), { toClassOnly: true })
  @IsInstance(Map)
  @IsString({ each: true })
  specifications?: Map<string, any>;
}
