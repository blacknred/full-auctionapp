import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { OffersService } from './offers.service';

@ApiTags('Offers')
@Controller('offers')
@UseFilters(AllExceptionFilter)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
}
