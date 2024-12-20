import { Injectable } from '@nestjs/common';
import { CoinDocument } from './coin.schema';
import { Coin } from './coin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { ICoinInfo } from 'src/types';
import { User } from 'src/auth/user.schema';
import { UserDocument } from 'src/auth/user.schema';

@Injectable()
export class CoinService {
  private client: CoinGeckoClient;

  constructor(
    @InjectModel(Coin.name) private coinModel: Model<CoinDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.client = new CoinGeckoClient(
      {
        timeout: 10000,
        autoRetry: true,
      },
      'CG-UR2MkZEUzXVbsHqH3vJVZxSm',
    );
  }

  async addHolding(id: string, cost: number, symbol: string, amount: number) {
    const coin = new this.coinModel({ id, cost, symbol, amount });
    await coin.save();
    return coin;
  }

  async getTotalInvest(userID: string) {
    const { investRate } = await this.userModel.findById(userID);
    const coinsInvested = await this.coinModel.find();
    return (
      coinsInvested.reduce((acc, coin) => acc + coin.cost * coin.amount, 0) *
      investRate
    );
  }

  async getHolding(userID: string) {
    try {
      const { investRate } = await this.userModel.findById(userID);
      const coinsInvested = await this.coinModel.find();
      const coinInfo = await this.client.coinMarket({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        sparkline: false,
        per_page: 200,
      });

      const result = coinsInvested.map((coin) => {
        const matchInfo = coinInfo.find(
          (datum: ICoinInfo) => datum.id === coin.id,
        );
        const res = {
          price: matchInfo.current_price,
          ROI: (matchInfo.current_price * coin.amount - coin.cost) / coin.cost,
          image: matchInfo.image,
          amount: coin.amount * investRate,
          symbol: matchInfo.symbol,
          name: matchInfo.name,
          id: matchInfo.id,
        };
        return res;
      });

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getGraph(userID: string, name: string, days: number) {
    const graphInfo = await fetch(
      `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=${days}`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-pro-api-key': 'CG-UR2MkZEUzXVbsHqH3vJVZxSm',
        },
      },
    );
    const data = await graphInfo.json();
    return data;
  }
}
