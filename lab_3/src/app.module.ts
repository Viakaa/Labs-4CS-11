import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController,AdminController,DriverController } from './controllers/users.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressesSchema,Addresses, Orders, OrdersSchema, UserSchema, Users,  } from './schema';
import { UserAuthorizationMiddleware } from './midellware/userAuthorization.middleware';
import { OrdersController } from './controllers/orders.controller';
import { AddressesService, OrderService } from './service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://viiboichuk:SP2qkM_dZBwAv6y@hi.exwtagn.mongodb.net/?retryWrites=true&w=majority&appName=Hi',
      { dbName: 'Hi' },
    ),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: Orders.name,
        schema: OrdersSchema,
      },
      {
        name: Addresses.name,
        schema: AddressesSchema
      }
    ]),
  ],
  controllers: [UsersController, OrdersController, AdminController,DriverController],
  providers: [UserService, OrderService, AddressesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthorizationMiddleware).forRoutes('/orders');
  }
}
