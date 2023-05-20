import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { BookDto } from './book.dto';

function delay(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'new_book' })
  newBook(book: BookDto): string {
    delay(10000);
    const result = this.appService.newBook(book);
    if (!result) {
      return 'Book already exists';
    } else {
      return result;
    }
  }

  @MessagePattern({ cmd: 'get_book' })
  getBook(BookId: string): BookDto {
    return this.appService.getBookById(BookId);
  }

  @MessagePattern({ cmd: 'get_book' })
  getBooks(): BookDto[] {
    return this.appService.getAllBooks();
  }
}
