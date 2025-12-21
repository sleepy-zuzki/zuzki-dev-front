import { Provider } from '@angular/core';

// Domain Repositories (Tokens)
import { AuthRepository } from '../../core/domain/repositories/auth.repository.interface';
import { UserRepository } from '../../core/domain/repositories/user.repository.interface';
import { ProjectRepository } from '../../core/domain/repositories/project.repository.interface';
import { FileRepository } from '../../core/domain/repositories/file.repository.interface';
import { TechnologyRepository } from '../../core/domain/repositories/technology.repository.interface';
import { StackRepository } from '../../core/domain/repositories/stack.repository.interface';

// Infrastructure Adapters (Implementations)
import { AuthHttpAdapter } from '../adapters/secondary/auth/auth-http.adapter';
import { UserHttpAdapter } from '../adapters/secondary/user/user-http.adapter';
import { ProjectStore } from '../adapters/secondary/project/project.store';
import { FileHttpAdapter } from '../adapters/secondary/file/file-http.adapter';
import { TechnologyApiService } from '../adapters/secondary/technology/technology-api.service';
import { StackHttpAdapter } from '../adapters/secondary/stack/stack-http.adapter';

/**
 * Configuración de inyección de dependencias para la arquitectura hexagonal.
 * Este archivo mapea las interfaces de dominio (puertos) con sus implementaciones
 * de infraestructura (adaptadores).
 */
export const REPOSITORY_PROVIDERS: Provider[] = [
  // Auth Repository
  {
    provide: AuthRepository,
    useClass: AuthHttpAdapter
  },

  // User Repository
  {
    provide: UserRepository,
    useClass: UserHttpAdapter
  },

  // Project Repository
  {
    provide: ProjectRepository,
    useClass: ProjectStore
  },

  // File Repository
  {
    provide: FileRepository,
    useClass: FileHttpAdapter
  },

  // Technology Repository
  {
    provide: TechnologyRepository,
    useClass: TechnologyApiService
  },

  // Stack Repository
  {
    provide: StackRepository,
    useClass: StackHttpAdapter
  }
];
