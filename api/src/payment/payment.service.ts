import { Injectable, Logger } from '@nestjs/common';

import { OffersService } from 'src/offers/offers/offers.service';
import { UsersService } from 'src/users/users/users.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private userService: UsersService,
    private offerService: OffersService,
  ) {}
}
