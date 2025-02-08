import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
 imports: [
 ConfigModule.forRoot({ isGlobal: true }),

 MongooseModule.forRootAsync({
 imports: [ConfigModule],
 inject: [ConfigService],
 useFactory: (configService: ConfigService) => ({
 uri: configService.get<string>('MONGO_URI') ,
 }),
 }),

 BooksModule, 
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}

