import { Observable } from 'rxjs';
import { CarouselImage } from '../entities/project/carousel-image.entity';

export interface CarouselImageRepository {
  getImagesByProjectId(projectId: string): Observable<CarouselImage[]>;

  uploadImage(projectId: string, file: File, altText: string): Observable<CarouselImage>;

  updateOrder(projectId: string, images: { id: string; order: number }[]): Observable<void>;

  deleteImage(imageId: string): Observable<void>;
  
  updateAltText(imageId: string, altText: string): Observable<CarouselImage>;
}
