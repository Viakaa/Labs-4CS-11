import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema, Users, LinkSchema, Links  } from './schema';
import { UserAuthorizationMiddleware } from './midellware/userAuthorization.middleware';
import { LinksController } from './controllers/links.controller';
import { LinksService } from './service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://viiboichuk:B6UL2BLRkKFFfejs@cluster0.7i5dsir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      { dbName: 'Info' },
    ),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: Links.name,
        schema: LinkSchema,
      }
    ]),
  ],
  controllers: [UsersController, LinksController],
  providers: [UserService, LinksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthorizationMiddleware).forRoutes('/orders');
  }
}
