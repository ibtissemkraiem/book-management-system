import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksService', () => {
  let service: BooksService;
  let model: any;

  beforeEach(async () => {
    model = {
      find: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const result = [{ title: 'Book 1' }, { title: 'Book 2' }];
      model.find.mockReturnThis();
      model.exec.mockResolvedValue(result);

      expect(await service.getAllBooks()).toBe(result);
    });
  });

  describe('createBook', () => {
    it('should create and return a new book', async () => {
      const createBookDto = new CreateBookDto();
      createBookDto.title = 'New Book';
      createBookDto.author = 'Author 1';

      const result = { ...createBookDto, _id: '123' };
      model.create.mockResolvedValue(result);

      expect(await service.create(createBookDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update and return the book', async () => {
      const updateBookDto = { title: 'Updated Book' };
      const result = { ...updateBookDto, _id: '123' };
      model.findByIdAndUpdate.mockResolvedValue(result);

      expect(await service.update('123', updateBookDto)).toBe(result);
    });

    it('should throw NotFoundException if book not found', async () => {
      model.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.update('123', { title: 'Updated Book' })).rejects.toThrow(
        new NotFoundException('Book with ID 123 not found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete the book', async () => {
      model.findByIdAndDelete.mockResolvedValue({});

      await expect(service.delete('123')).resolves.not.toThrow();
    });

    it('should throw NotFoundException if book not found', async () => {
      model.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.delete('123')).rejects.toThrow(
        new NotFoundException('Book with ID 123 not found'),
      );
    });
  });
});
