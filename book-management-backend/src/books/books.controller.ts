import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateBookDto } from './dto/Edit-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of books', type: [Book] })
  async getBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiResponse({ status: 201, description: 'Book successfully created', type: Book })
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }



  @Put(':id')
async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
  return this.booksService.update(id, updateBookDto);
}
@Delete(':id')
async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
  await this.booksService.delete(id);
  return { message: 'Book deleted successfully' };
}
}
