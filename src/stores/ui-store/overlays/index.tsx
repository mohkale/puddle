export enum OverlayKind {
  TORRENT_DETAILS,
  SETTINGS
}

interface OverlayBase {
  kind: OverlayKind
}

export interface TorrentDetailsOverlay extends OverlayBase {
  torrentId: number
}

export interface SettingsOverlay extends OverlayBase {}

export type OverlayType = TorrentDetailsOverlay|SettingsOverlay
