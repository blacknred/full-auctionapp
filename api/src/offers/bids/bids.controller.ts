import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { BidsService } from './bids.service';

@ApiTags('Bids')
@Controller('bids')
@UseFilters(AllExceptionFilter)
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
}
