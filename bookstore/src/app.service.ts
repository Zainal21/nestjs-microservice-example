import { Injectable } from '@nestjs/common';
import { BookDto } from './book.dto';

const bookStore: BookDto[] = [];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBookById(BookId: string) {
    return bookStore.find((b: BookDto) => b.id == BookId);
  }

  getAllBooks() {
    return bookStore;
  }

  newBook(book: BookDto) {
    const exists = bookStore.find((b: BookDto) => {
      return (
        b.title == book.title &&
        b.author == book.author &&
        b.release_date == book.release_date
      );
    });
    if (exists) return false;
    book.id = 'Book_' + (bookStore.length + 1);
    bookStore.push(book);
    return book.id;
  }
}
