export interface Button {
  fg: string
  bg: string
  border: string
  hoverFg: string
  hoverBg: string

  // Color for async buttons when processing.
  activeFg: string
  activeBg: string

  disabledFg: string
  disabledBg: string
  disabledBorder: string
}

export interface TorrentListRow {
  fg: string,
  bg: string,
  borderColor: string,
  progressBarBg: string,
  progressBarFg: string,

  selectedFg: string,
  selectedBg: string,
  selectedBorderColor: string,
  selectedProgressBarFg: string,
  selectedProgressBarBg: string,
}

export interface ScrollBar {
  fg: string
  selectedFg: string
}

export interface Theme {
  actionColor: string,

  fg: string
  bg: string
  title: string

  priorityLow: string
  priorityNorm: string
  priorityHigh: string

  button: Button
  submitButton: Button

  scrollBar: ScrollBar
  sidebarScrollBar: ScrollBar

  tooltipBg: string,
  tooltipFg: string,

  sideBarBg: string,
  sideBarFg: string,
  sideBarHoverFg: string
  sideBarTitleColor: string,
  sideBarBadgeFg: string

  graphDownload: string
  graphUpload: string

  searchBg: string,
  searchFg: string,
  searchBorderColor: string,
  searchSelectedBg: string,
  searchSelectedFg: string,
  searchSelectedBorderColor: string,

  headerBg: string,
  headerBorderColor: string,
  headerButtonFg: string,
  headerButtonBg: string,
  headerButtonHoverFg: string,
  headerButtonHoverBg: string,

  torrentsBorderColor: string,
  torrentsColumnColor: string,
  torrentsColumnHoverColor: string,
  torrentsSelectedColumnColor: string,
  torrentsSelectedColumnHoverColor: string,

  torrentsIdleRow: TorrentListRow,
  torrentsDownloadingRow: TorrentListRow,
  torrentsSeedingRow: TorrentListRow,
  torrentsErrorRow: TorrentListRow,
  torrentsCheckingRow: TorrentListRow,

  overlayBackground: string,

  modalBorderColor: string,
  modalBg: string,
  modalFg: string,
  modalTitle: string,

  contextMenuFg: string
  contextMenuBg: string
  contextMenuBorder: string
  contextMenuHoverFg: string
  contextMenuHoverBg: string

  inputBg: string
  inputFg: string
  inputBorder: string
  inputPlaceholder: string
  inputSelectedBg: string
  inputSelectedFg: string
  inputSelectedPlaceholder: string
  inputSelectedBorder: string
}
