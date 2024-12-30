export class ProductCreatedEvent {
  constructor(
    public readonly name: string,
    public readonly price: string,
  ) {}
}
