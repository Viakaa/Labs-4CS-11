import { Injectable } from '@nestjs/common';
import { LoginDto, UserDto} from '../models';
import { UserDoc, Users} from '../schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserAlreadyExists, UserNotFound } from '../shared';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDoc>,
  ) {}

  async createUser(body: UserDto) {
    const isExists = await this.userModel.findOne({
      email: body.email,
    });


    if (isExists) {
      throw new UserAlreadyExists(
        `This email:${body.email} already in use`,
      );
    }

    const apiKey = uuidv4();

    const doc = new this.userModel({
      ...body,
      apiKey: apiKey, 
    });

    const user = await doc.save();

    return user.toObject();
  }

  async login(body: LoginDto) {
    const user = await this.userModel.findOne({
      email: body.email,
      password: body.password,
    });

    if (!user) {
      throw new UserNotFound(`User with such credentials was not found`);
    }
    return { email: user.email, password: user.password, message: "Login successful" };
  }
}
