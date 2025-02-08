import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRootAsync
    ({imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI'), 
    }),
  }),
    
    BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
