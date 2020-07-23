interface TorrentListRow {
  fg: string,
  bg: string,
  borderColor: string,
  progressBarBg: string,
  progressBarFg: string,
}

export interface Theme {
  actionColor: string,

  scrollbarColor: string,
  scrollbarHoverColor: string,

  tooltipBg: string,
  tooltipFg: string,

  sideBarBg: string,
  sideBarFg: string,
  sideBarHoverFg: string
  sideBarTitleColor: string,

  searchBg: string,
  searchFg: string,
  searchBorderColor: string,
  searchActiveBg: string,
  searchActiveFg: string,
  searchActiveBorderColor: string,

  headerBg: string,
  headerBorderColor: string,
  headerButtonFg: string,
  headerButtonBg: string,
  headerButtonHoverFg: string,
  headerButtonHoverBg: string,

  torrentsBorderColor: string,
  torrentsColumnColor: string,
  torrentsColumnHoverColor: string,
  torrentsActiveColumnColor: string,
  torrentsActiveColumnHoverColor: string,

  torrentsIdleRow: TorrentListRow,
  torrentsDownloadingRow: TorrentListRow,
  torrentsSelectedRow: TorrentListRow,

  overlayContainerBackground: string,
  overlayBorderColor: string,
  overlayBg: string,
  overlayFg: string,
  overlayTitle: string,
  overlayHighlight: string,
}

export function setTheme(theme: Theme) {
  let root = document.documentElement.style;
  root.setProperty('--action-color', theme.actionColor)

  root.setProperty('--scrollbar-color', theme.scrollbarColor)
  root.setProperty('--scrollbar-hover-color', theme.scrollbarHoverColor)

  root.setProperty('--tooltip-bg', theme.tooltipBg)
  root.setProperty('--tooltip-fg', theme.tooltipFg)

  root.setProperty('--side-bar-bg', theme.sideBarBg)
  root.setProperty('--side-bar-fg', theme.sideBarFg)
  root.setProperty('--side-bar-hover-fg', theme.sideBarHoverFg)
  root.setProperty('--side-bar-title-color', theme.sideBarTitleColor)

  root.setProperty('--search-bg', theme.searchBg)
  root.setProperty('--search-fg', theme.searchFg)
  root.setProperty('--search-border-color', theme.searchBorderColor)
  root.setProperty('--search-active-bg', theme.searchActiveBg)
  root.setProperty('--search-active-fg', theme.searchActiveFg)
  root.setProperty('--search-active-border-color', theme.searchActiveBorderColor)

  root.setProperty('--header-bg', theme.headerBg)
  root.setProperty('--header-border-color', theme.headerBorderColor)
  root.setProperty('--header-button-fg', theme.headerButtonFg)
  root.setProperty('--header-button-bg', theme.headerButtonBg)
  root.setProperty('--header-button-hover-fg', theme.headerButtonHoverFg)
  root.setProperty('--header-button-hover-bg', theme.headerButtonHoverBg)

  root.setProperty('--torrents-border-color', theme.torrentsBorderColor)
  root.setProperty('--torrents-active-column-color', theme.torrentsActiveColumnColor)
  root.setProperty('--torrents-column-color', theme.torrentsColumnColor)
  root.setProperty('--torrents-column-hover-color', theme.torrentsColumnHoverColor)
  root.setProperty('--torrents-active-column-hover-color', theme.torrentsActiveColumnHoverColor)

  root.setProperty('--torrents-row-fg', theme.torrentsIdleRow.fg)
  root.setProperty('--torrents-row-bg', theme.torrentsIdleRow.bg)
  root.setProperty('--torrents-row-border-color', theme.torrentsIdleRow.bg)
  root.setProperty('--torrents-row-progress-fg', theme.torrentsIdleRow.progressBarFg)
  root.setProperty('--torrents-row-progress-bg', theme.torrentsIdleRow.progressBarBg)

  root.setProperty('--torrents-row-selected-fg', theme.torrentsSelectedRow.fg)
  root.setProperty('--torrents-row-selected-bg', theme.torrentsSelectedRow.bg)
  root.setProperty('--torrents-row-selected-border-color', theme.torrentsSelectedRow.bg)
  root.setProperty('--torrents-row-selected-progress-fg', theme.torrentsSelectedRow.progressBarFg)
  root.setProperty('--torrents-row-selected-progress-bg', theme.torrentsSelectedRow.progressBarBg)

  root.setProperty('--torrents-row-downloading-fg', theme.torrentsDownloadingRow.fg)
  root.setProperty('--torrents-row-downloading-bg', theme.torrentsDownloadingRow.bg)
  root.setProperty('--torrents-row-downloading-border-color', theme.torrentsDownloadingRow.borderColor)
  root.setProperty('--torrents-row-downloading-progress-fg', theme.torrentsDownloadingRow.progressBarFg)
  root.setProperty('--torrents-row-downloading-progress-bg', theme.torrentsDownloadingRow.progressBarBg)

  root.setProperty('--overlay-container-background', theme.overlayContainerBackground);
  root.setProperty('--overlay-border-color', theme.overlayBorderColor)
  root.setProperty('--overlay-bg', theme.overlayBg)
  root.setProperty('--overlay-fg', theme.overlayFg)
  root.setProperty('--overlay-title', theme.overlayTitle)
  root.setProperty('--overlay-highlight', theme.overlayHighlight)
}

// reverse engineered from [[https://github.com/Flood-UI/flood][flood]].
export const defaultTheme: Theme = {
  actionColor: '#258de5',

  scrollbarColor: '#999999',
  scrollbarHoverColor: '#666666',

  tooltipBg: '#0f151c',
  tooltipFg: '#506480',

  sideBarBg: '#293341',
  sideBarFg: '#506480',
  sideBarHoverFg: '#778da8',
  sideBarTitleColor: 'rgba(82,103,128,0.5)',

  searchBg: 'rgba(9,24,36,0.3)',
  searchFg: 'rgba(82,103,128,0.5)',
  searchBorderColor: 'rgba(9,24,36,0.4)',
  searchActiveBg: 'rgba(37,141,229,0.25)',
  searchActiveFg: '#258de5',
  searchActiveBorderColor: 'rgba(37,141,229,0.3)',

  headerBg: '#e9eef2',
  headerBorderColor: '#ccd2d7',
  headerButtonFg: '#8899a8',
  headerButtonBg: 'transparent',
  headerButtonHoverFg: '#258de5',
  headerButtonHoverBg: '#dfe5ea',

  torrentsBorderColor: 'rgba(29,41,56,0.08)',
  torrentsColumnColor: '#abbac7',
  torrentsColumnHoverColor: '#8ca1b3',
  torrentsActiveColumnColor: '#576e82',
  torrentsActiveColumnHoverColor: '#425464',
  torrentsIdleRow: {
    fg: '#c3ccd3',
    bg: 'transparent',
    borderColor: 'rgba(29,41,56,0.08)',
    progressBarFg: 'grey',
    progressBarBg: '#e7ebee',
  },
  torrentsDownloadingRow: {
    fg: '#4b677f',
    bg: '',
    borderColor: 'rgba(29,41,56,0.08)',
    progressBarFg: '#39ce83',
    progressBarBg: 'rgba(57,206,131,0.15)',
  },
  torrentsSelectedRow: {
    fg: 'rgba(255,255,255,0.5)',
    bg: '#258de5',
    borderColor: '#1b86e0',
    progressBarFg: 'grey',
    progressBarBg: 'rgba(255,255,255,0.15)',
  },
  overlayContainerBackground: 'radial-gradient(circle, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.75) 100%)',
  overlayBorderColor: 'rgba(9,24,36,0.4)',
  overlayBg: '#3A4553',
  overlayFg: '#7d8d9f',
  overlayTitle: 'white',
  overlayHighlight: '#abc2e2',
};
