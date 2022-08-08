import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
@UseFilters(AllExceptionFilter)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
}
