import { BookDto } from './../../bookstore/src/book.dto';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('booksstore')
export class AppController {
  constructor(@Inject('BOOKS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllBooks() {
    return this.client.send({ cmd: 'get_books' }, {});
  }

  @Get(':id')
  getBookById(@Param('id') id) {
    return this.client.send({ cmd: 'get_books' }, id);
  }

  @Post()
  createNewBook(@Body() book: BookDto) {
    return this.client.send({ cmd: 'new_book' }, book);
  }
}
