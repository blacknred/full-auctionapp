import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { BillingService } from './billing.service';

@ApiTags('Billing')
@Controller('billing')
@UseFilters(AllExceptionFilter)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}
}
