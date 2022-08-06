import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { OffersService } from './offers.service';

@ApiTags('Offers')
@Controller('offers')
@UseFilters(AllExceptionFilter)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // @Post()
  // @WithCreatedApi(BlockResponseDto, 'Create new block')
  // async create(@Body() createBlockDto: CreateBlockDto): Promise<BlockResponseDto> {
  //   return this.blocksService.create(createBlockDto);
  // }

  // @Get()
  // @WithAuth()
  // @WithOkApi(BlocksResponseDto, 'List all blocks of authorized user')
  // async getAll(
  //   @Auth() { id },
  //   @Query() getBlocksDto: GetBlocksDto,
  // ): Promise<BlocksResponseDto> {
  //   return this.blocksService.findAll(id, getBlocksDto);
  // }

  // @Delete()
  // @WithAuth()
  // @WithOkApi(EmptyResponseDto, 'Delete block')
  // async remove(@Body() { uid }: DeleteBlockDto): Promise<EmptyResponseDto> {
  //   return this.blocksService.remove(uid);
  // }
}
