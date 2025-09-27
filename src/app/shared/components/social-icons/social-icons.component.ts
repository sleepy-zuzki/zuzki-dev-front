import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherYoutube, featherGithub, featherTwitch } from '@ng-icons/feather-icons';
import { bootstrapTwitterX } from '@ng-icons/bootstrap-icons';

type PlatformKey = 'twitch' | 'youtube' | 'github' | 'x';

interface PlatformConfig {
  key: PlatformKey;
  href: string;
  icon: string;
  aria: string;
}

const PLATFORM_CONFIG: Record<PlatformKey, PlatformConfig> = {
  twitch: {
    key: 'twitch',
    href: 'https://twitch.tv/sleepy_zuzki',
    icon: 'featherTwitch',
    aria: 'Visitar canal de Twitch'
  },
  youtube: {
    key: 'youtube',
    href: 'https://youtube.com/@sleepy_zuzki',
    icon: 'featherYoutube',
    aria: 'Visitar canal de YouTube'
  },
  github: {
    key: 'github',
    href: 'https://github.com/sleepy-zuzki',
    icon: 'featherGithub',
    aria: 'Visitar perfil de GitHub'
  },
  x: {
    key: 'x',
    href: 'https://x.com/sleepy_zuzki',
    icon: 'bootstrapTwitterX', // Ícono de Twitter como representación de X
    aria: 'Visitar perfil de X'
  }
};

@Component({
  selector: 'app-social-icons',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './social-icons.component.html',
  styleUrl: './social-icons.component.css',
  providers: [provideIcons({ featherYoutube, featherGithub, bootstrapTwitterX, featherTwitch })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialIconsComponent {
  @Input({ required: true }) platforms: ReadonlyArray<PlatformKey> = [];
  @Input() align: 'start' | 'center' | 'end' = 'center';

  get items(): PlatformConfig[] {
    return (this.platforms ?? [])
      .map((p) => PLATFORM_CONFIG[p])
      .filter((v): v is PlatformConfig => !!v);
  }

  get alignmentClass(): string {
    switch (this.align) {
      case 'start':
        return 'align-start';
      case 'end':
        return 'align-end';
      default:
        return 'align-center';
    }
  }

  hoverClass(key: PlatformKey): string {
    switch (key) {
      case 'twitch':
        return 'twitch-hover';
      case 'youtube':
        return 'youtube-hover';
      case 'github':
        return 'github-hover';
      case 'x':
        return 'twitter-hover';
    }
  }
}
