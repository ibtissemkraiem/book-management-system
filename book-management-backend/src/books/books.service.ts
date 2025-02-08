import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, IBook } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import{UpdateBookDto}from './dto/Edit-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel.find().exec(); 
  }

  async create(book: CreateBookDto): Promise<IBook> {
    return this.bookModel.create(book);
    }
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async delete(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
  
  
}
