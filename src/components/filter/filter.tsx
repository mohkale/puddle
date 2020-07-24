import TorrentResponse from '@puddle/transmission/responses/torrent';

export default abstract class Filter {
  /**
   * assert whether the given torrent response passes this filter.
   */
  abstract filter(entry: Partial<TorrentResponse>): boolean;
}

