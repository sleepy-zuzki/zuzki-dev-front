export class CarouselImage {
  constructor(
    public id: string,
    public projectId: string,
    public imageUrl: string,
    public order: number,
    public altText?: string,
  ) {}
}
