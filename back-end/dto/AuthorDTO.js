class AuthorDto {
  first_name;
  last_name;

  constructor(author) {
    this.first_name = author.first_name;
    this.last_name = author.last_name;
  }
}
export default AuthorDto;
