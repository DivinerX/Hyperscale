import { Injectable } from '@nestjs/common';
import { CoinDocument } from './coin.schema';
import { Coin } from './coin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { ICoinGraphInput, ICoinInfo } from 'src/types';
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
        return {
          price: matchInfo.current_price,
          cost: coin.cost * investRate,
          ROI: (matchInfo.current_price * coin.amount - coin.cost) / coin.cost,
          image: matchInfo.image,
          amount: coin.amount * investRate,
          symbol: matchInfo.symbol,
          name: matchInfo.name,
          id: matchInfo.id,
        };
      });

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getGraph(coinInfos: ICoinGraphInput[], days: number) {
    try {
      const graphInfo = await Promise.all(
        coinInfos.map(async (coin) => {
          const historical = await this.client.coinIdMarketChart({
            id: coin.id,
            vs_currency: 'usd',
            days: days,
          });
          return {
            id: coin.id,
            historical: historical.prices,
          };
        }),
      );
      console.log(coinInfos);
      const acc = graphInfo.reduce((acc, coin) => {
        if (acc.length === 0) {
          return coin.historical.map((price) => {
            return [
              price[0],
              price[1] * coinInfos.find((info) => info.id === coin.id)?.amount,
            ];
          });
        }
        return acc.map((price, index) => {
          if (coin.historical.length > index) {
            return [
              price[0],
              price[1] +
                coin.historical[index][1] *
                  coinInfos.find((info) => info.id === coin.id)?.amount,
            ];
          }
          return price;
        });
      }, []);
      return acc;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
