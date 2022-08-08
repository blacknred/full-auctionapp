import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { ObserversService } from './observers.service';

@ApiTags('Observers')
@Controller('observers')
@UseFilters(AllExceptionFilter)
export class ObserversController {
  constructor(private readonly observersService: ObserversService) {}
}
