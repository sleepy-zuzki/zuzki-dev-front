import { File } from '../../interfaces/file.interface';

export class FileEntity implements File {
  constructor(
    public readonly id: number,
    public readonly originalName: string,
    public readonly filename: string,
    public readonly mimeType: string,
    public readonly size: number,
    public readonly url: string,
    public readonly alt: string | undefined,
    public readonly caption: string | undefined,
    public readonly projectId: number | undefined,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  isImage(): boolean {
    return this.mimeType.startsWith('image/');
  }

  isVideo(): boolean {
    return this.mimeType.startsWith('video/');
  }

  getFileExtension(): string {
    return this.originalName.split('.').pop() || '';
  }

  getFormattedSize(): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = this.size;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }
}
