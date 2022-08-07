import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsCurrency,
  IsDateString,
  IsEnum,
  IsInstance,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

import { OfferType } from '../types/offer.type';

export class CreateOfferDto {
  @ApiProperty({
    enum: OfferType,
    example: OfferType.SELL,
  })
  @IsEnum(OfferType, { message: 'Must be an OfferType enum' })
  type: OfferType;

  @ApiProperty({ type: 'string', example: 'Offer title' })
  @Length(5, 500, { message: 'Must have from 5 to 100 chars' })
  title: string;

  @ApiProperty({ type: 'string', example: 'Offer description' })
  @MinLength(1, { message: 'Empty description' })
  description: string;

  @ApiProperty({
    type: Map,
    example: {
      author: 'Rudyard Kipling',
      year: '1894',
    },
  })
  @IsInstance(Map)
  @IsString({ each: true })
  specifications: Map<string, any>;

  @ApiProperty({
    type: 'string',
    example: 'https://path-to-file-preview-1.png',
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ArrayMaxSize(4, { message: 'Must includes 4 assets at max' })
  @IsUrl({ message: 'Not valid url', each: true })
  assets?: string[];

  @ApiProperty({
    type: 'number',
    example: '2022-08-14 13:55:16.622111',
    required: false,
  })
  @IsDateString(null, { message: 'Must be a date string' })
  endsAt?: string;

  @ApiProperty({ type: 'number', example: 1, required: false })
  @IsOptional()
  @IsNumberString(null, { message: 'Must be a number' })
  categoryId?: number;

  //

  @ApiProperty({ type: 'number', example: 100.25 })
  @IsNumberString({ message: 'Must be a number' })
  startPrice: number;

  @ApiProperty({ type: 'number', example: 200.25, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  blitzPrice?: number;

  @ApiProperty({ type: 'number', example: 20.25, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  priceStep?: number;

  @ApiProperty({ type: 'string', example: 'USD' })
  @IsCurrency({ message: 'Not valid currency' })
  currency: string;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isAnonymous?: boolean;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isSingleBid?: boolean;

  @ApiProperty({ type: 'number', example: 30, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  bidderMinRating?: number;
}
