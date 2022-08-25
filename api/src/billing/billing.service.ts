import { Injectable, Logger } from '@nestjs/common';

import { OffersService } from 'src/offers/offers/offers.service';
import { UsersService } from 'src/users/users/users.service';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private userService: UsersService,
    private offerService: OffersService,
  ) {}
}
