import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
@UseFilters(AllExceptionFilter)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
}
