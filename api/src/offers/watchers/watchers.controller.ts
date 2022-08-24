import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { WatchersService } from './watchers.service';

@ApiTags('Watchers')
@Controller('watchers')
@UseFilters(AllExceptionFilter)
export class WatchersController {
  constructor(private readonly watchersService: WatchersService) {}
}
