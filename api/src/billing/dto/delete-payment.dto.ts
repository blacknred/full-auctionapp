import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { Payment } from '../types/payment.type';

export class DeleteOfferDto {
  @ApiProperty({
    enum: Payment,
    example: Payment.OFFER_PROMOTION,
  })
  @IsEnum(Payment, { message: 'Must be an Payment enum' })
  type: Payment;
}
