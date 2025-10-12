import { Technology } from '@core/domain';

export class TechnologyEntity implements Technology {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly slug: string,
    public readonly website: string | undefined,
  ) {}

  hasWebsite(): boolean {
    return !!this.website;
  }
}
