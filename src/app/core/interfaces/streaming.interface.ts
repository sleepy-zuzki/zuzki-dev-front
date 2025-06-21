export interface TwitchStream {
  isLive: boolean;
  title?: string;
  type?: string;
  game_name?: string;
  thumbnail_url?: string;
}

export interface YoutubeStream {
  isLive: boolean;
  videoId?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  concurrentViewers?: string;
  startTime?: string | null;
}
