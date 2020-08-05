/**
 * The kinds of overlays that can be shown.
 * each of these should have an associated
 * store, but they don't HAVE to have one.
 */
export enum OverlayType {
  TORRENT_DETAILS,
  SETTINGS,
  SET_LABELS,
  STATISTICS,
  TORRENT_REMOVE,
}
