import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule, CartModule, MailModule, OrderModule } from './modules';
import { DatabaseModule } from '@core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BookService } from './modules/book/book.service';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MailModule,
    DatabaseModule,
    CartModule,
    OrderModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [BookService],
})
export class AppModule {}
