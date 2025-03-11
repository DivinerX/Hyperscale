import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

interface TwitterUser {
  twitterId: string;
  username: string;
  avatar: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, avatar: string) {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
      avatar,
    });

    return this.generateToken(user);
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async getAllUser() {
    return await this.userModel
      .find()
      .exec()
      .then((users) =>
        users.map((user) => ({ ...user.toObject(), id: user._id })),
      );
  }

  async getTotalUser() {
    return await this.userModel.countDocuments().exec();
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel
      .findOne({ username })
      .select('-password')
      .exec();
    return { ...user.toObject(), id: user._id };
  }

  async findOrCreateTwitterUser(twitterUser: TwitterUser) {
    let user = await this.userModel.findOne({ 
      username: twitterUser.username 
    }).exec();

    if (!user) {
      user = await this.userModel.create({
        username: twitterUser.username,
        avatar: twitterUser.avatar,
        password: null, // Twitter users don't need password
        twitterId: twitterUser.twitterId,
        verified: true, // Twitter users are considered verified
      });
    }

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = {
      sub: user._id,
      username: user.username,
      avatar: user.avatar,
      verified: user.verified,
      id: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateToken(token: string): User | null {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
