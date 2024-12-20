import { Controller, Get, Post, Req, Body, Query } from '@nestjs/common';
import { CoinService } from './coin.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/coin')
@UseGuards(AuthGuard)
export class CoinController {
  constructor(private coinService: CoinService) {}

  @Get('/info')
  getHolding(@Req() req) {
    return this.coinService.getHolding(req.user.id);
  }

  @Get('/total-invest')
  getTotalInvest(@Req() req) {
    return this.coinService.getTotalInvest(req.user.id);
  }

  @Post('/info')
  addHolding(
    @Body() body: { id: string; cost: number; symbol: string; amount: number },
  ) {
    return this.coinService.addHolding(
      body.id,
      body.cost,
      body.symbol,
      body.amount,
    );
  }

  @Get('/graph')
  getGraph(@Req() req, @Query() query: { name: string; days: number }) {
    return this.coinService.getGraph(req.user.id, query.name, query.days);
  }
}
