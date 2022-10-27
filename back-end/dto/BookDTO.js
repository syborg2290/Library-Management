class BookDto {
  name;
  isbn;
  authorId;

  constructor(book) {
    this.name = book.name;
    this.isbn = book.isbn;
    this.authorId = book.authorId;
  }
}
export default BookDto;
