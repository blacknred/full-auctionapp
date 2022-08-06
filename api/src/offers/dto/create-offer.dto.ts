import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInstance,
  IsNumber,
  IsOptional,
  IsString,
  Length,
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
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty({ type: 'string', example: 'Offer description' })
  @IsString({ message: 'Must be a string' })
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
  @IsString({ message: 'Must includes an url strings', each: true })
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
  @IsNumber(null, { message: 'Must be a number' })
  categoryId?: number;

  //

  @ApiProperty({ type: 'number', example: 100.25 })
  @IsNumber(null, { message: 'Must be a number' })
  startPrice: number;

  @ApiProperty({ type: 'number', example: 200.25, required: false })
  @IsOptional()
  @IsNumber(null, { message: 'Must be a number' })
  blitzPrice?: number;

  @ApiProperty({ type: 'number', example: 20.25, required: false })
  @IsOptional()
  @IsNumber(null, { message: 'Must be a number' })
  priceStep?: number;

  @ApiProperty({ type: 'string', example: 'usd' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 3, { message: 'Must include 3 chars' })
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
  @IsNumber(null, { message: 'Must be a number' })
  bidderMinRating?: number;
}
