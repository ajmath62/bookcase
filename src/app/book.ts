export class Book {
  id: number

  constructor(
    public title: string,
    public author?: string,
    public location?: number
  ) { }
}
