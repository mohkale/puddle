interface TorrentListRow {
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

interface ScrollBar {
  fg: string
  selectedFg: string
}

export interface Theme {
  actionColor: string,

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

  overlayContainerBackground: string,
  overlayBorderColor: string,
  overlayBg: string,
  overlayFg: string,
  overlayTitle: string,
  overlayHighlight: string,
}

export function setTheme(theme: Theme) {
  const root = document.documentElement.style;
  root.setProperty('--action-color', theme.actionColor)

  function setScrollBarClasses(prefix: string, scrollbar: ScrollBar) {
    root.setProperty(`${prefix}-color`, scrollbar.fg)
    root.setProperty(`${prefix}-hover-color`, scrollbar.selectedFg)
  }

  setScrollBarClasses('--scrollbar', theme.scrollBar)
  setScrollBarClasses('--scrollbar-sidebar', theme.sidebarScrollBar)

  root.setProperty('--tooltip-bg', theme.tooltipBg)
  root.setProperty('--tooltip-fg', theme.tooltipFg)

  root.setProperty('--side-bar-bg', theme.sideBarBg)
  root.setProperty('--side-bar-fg', theme.sideBarFg)
  root.setProperty('--side-bar-hover-fg', theme.sideBarHoverFg)
  root.setProperty('--side-bar-title-color', theme.sideBarTitleColor)
  root.setProperty('--side-bar-badge-fg', theme.sideBarBadgeFg)

  root.setProperty('--graph-download', theme.graphDownload)
  root.setProperty('--graph-upload', theme.graphUpload)

  root.setProperty('--search-bg', theme.searchBg)
  root.setProperty('--search-fg', theme.searchFg)
  root.setProperty('--search-border-color', theme.searchBorderColor)
  root.setProperty('--search-selected-bg', theme.searchSelectedBg)
  root.setProperty('--search-selected-fg', theme.searchSelectedFg)
  root.setProperty('--search-selected-border-color', theme.searchSelectedBorderColor)

  root.setProperty('--header-bg', theme.headerBg)
  root.setProperty('--header-border-color', theme.headerBorderColor)
  root.setProperty('--header-button-fg', theme.headerButtonFg)
  root.setProperty('--header-button-bg', theme.headerButtonBg)
  root.setProperty('--header-button-hover-fg', theme.headerButtonHoverFg)
  root.setProperty('--header-button-hover-bg', theme.headerButtonHoverBg)

  root.setProperty('--torrents-column-color', theme.torrentsColumnColor)
  root.setProperty('--torrents-column-hover-color', theme.torrentsColumnHoverColor)
  root.setProperty('--torrents-selected-column-color', theme.torrentsSelectedColumnColor)
  root.setProperty('--torrents-selected-column-hover-color', theme.torrentsSelectedColumnHoverColor)

  root.setProperty('--torrents-border-color', theme.torrentsBorderColor)

  function setTorrentsRowClasses(prefix: string, selectedPrefix: string, row: TorrentListRow) {
    root.setProperty(`${prefix}-fg`, row.fg)
    root.setProperty(`${prefix}-bg`, row.bg)
    root.setProperty(`${prefix}-border-color`, row.borderColor)
    root.setProperty(`${prefix}-progress-fg`, row.progressBarFg)
    root.setProperty(`${prefix}-progress-bg`, row.progressBarBg)

    root.setProperty(`${selectedPrefix}-fg`, row.selectedFg)
    root.setProperty(`${selectedPrefix}-bg`, row.selectedBg)
    root.setProperty(`${selectedPrefix}-border-color`, row.selectedBorderColor)
    root.setProperty(`${selectedPrefix}-progress-fg`, row.selectedProgressBarFg)
    root.setProperty(`${selectedPrefix}-progress-bg`, row.selectedProgressBarBg)
  }

  setTorrentsRowClasses('--torrents-row', '--torrents-selected-row', theme.torrentsIdleRow)
  setTorrentsRowClasses('--torrents-downloading-row', '--torrents-selected-downloading-row', theme.torrentsDownloadingRow)
  setTorrentsRowClasses('--torrents-seeding-row', '--torrents-selected-seeding-row', theme.torrentsSeedingRow)
  setTorrentsRowClasses('--torrents-error-row', '--torrents-selected-error-row', theme.torrentsErrorRow)
  setTorrentsRowClasses('--torrents-checking-row', '--torrents-selected-checking-row', theme.torrentsCheckingRow)

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

  scrollBar: {
    fg: '#999999',
    selectedFg: '#666666',
  },

  sidebarScrollBar: {
    fg: 'rgba(82,103,128,0.5)',
    selectedFg: '#506480',
  },

  tooltipBg: '#0f151c',
  tooltipFg: '#506480',

  sideBarBg: '#293341',
  sideBarFg: '#506480',
  sideBarHoverFg: '#778da8',
  sideBarTitleColor: 'rgba(82,103,128,0.5)',
  sideBarBadgeFg: '#1f2731',

  graphDownload: '#39ce83',
  graphUpload: '#258de5',

  searchBg: 'rgba(9,24,36,0.3)',
  searchFg: 'rgba(82,103,128,0.5)',
  searchBorderColor: 'rgba(9,24,36,0.4)',
  searchSelectedBg: 'rgba(37,141,229,0.25)',
  searchSelectedFg: '#258de5',
  searchSelectedBorderColor: 'rgba(37,141,229,0.3)',

  headerBg: '#e9eef2',
  headerBorderColor: '#ccd2d7',
  headerButtonFg: '#8899a8',
  headerButtonBg: 'transparent',
  headerButtonHoverFg: '#258de5',
  headerButtonHoverBg: '#dfe5ea',

  torrentsBorderColor: 'rgba(29,41,56,0.08)',
  torrentsColumnColor: '#abbac7',
  torrentsColumnHoverColor: '#8ca1b3',
  torrentsSelectedColumnColor: '#576e82',
  torrentsSelectedColumnHoverColor: '#425464',
  torrentsIdleRow: {
    fg: '#c3ccd3',
    bg: 'transparent',
    borderColor: 'rgba(29, 41, 56, 0.8)',
    progressBarFg: '#e7ebee',
    progressBarBg: 'rgba(231,235,238,0.35)',

    selectedFg: 'rgba(255,255,255,0.5)',
    selectedBg: '#258de5',
    selectedBorderColor: '#1b86e0',
    selectedProgressBarFg: 'grey',
    selectedProgressBarBg: 'rgba(255,255,255,0.15)',
  },
  torrentsDownloadingRow: {
    fg: '#4b677f',
    bg: 'transparent',
    borderColor: 'rgba(29, 41, 56, 0.8)',
    progressBarFg: '#39ce83',
    progressBarBg: 'rgba(57,206,131,0.15)',

    selectedFg: 'white',
    selectedBg: '#258de5',
    selectedBorderColor: '#1b86e0',
    selectedProgressBarFg: 'white',
    selectedProgressBarBg: '#459ee9',
  },
  torrentsSeedingRow: {
    fg: '#4b677f',
    bg: 'transparent',
    borderColor: 'rgba(29, 41, 56, 0.8)',
    progressBarFg: '#258de5',
    progressBarBg: 'rgba(#258de5, 0.15)',

    selectedFg: 'white',
    selectedBg: '#258de5',
    selectedBorderColor: '#1b86e0',
    selectedProgressBarFg: 'white',
    selectedProgressBarBg: '#459ee9',
  },
  torrentsCheckingRow: {
    fg: '#ffc894',
    bg: 'transparent',
    borderColor: 'rgba(255, 174, 99, 0.8)',
    progressBarFg: '#ffad61',
    progressBarBg: 'hsla(29, 100%, 69%, 0.15)',
    // #F9983E

    selectedFg: 'rgba(255,255,255,0.5)',
    selectedBg: '#F9983E',
    selectedBorderColor: 'rgba(255, 174, 99, 0.8)',
    selectedProgressBarFg: 'white',
    selectedProgressBarBg: 'rgba(255,255,255,0.15)',
  },
  torrentsErrorRow: {
    fg: '#f2acbc',
    bg: 'transparent',
    borderColor: 'rgba(29, 41, 56, 0.8)',
    progressBarFg: '#f2acbc',
    progressBarBg: 'rgba(242,172,188,0.15)',

    selectedFg: 'rgba(255,255,255,0.5)',
    selectedBg: '#e95779',
    selectedBorderColor: '#e7496e',
    selectedProgressBarFg: '#f2acbc',
    selectedProgressBarBg: 'rgba(255,255,255,0.15)',
  },
  overlayContainerBackground: 'radial-gradient(circle, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.75) 100%)',
  overlayBorderColor: 'rgba(9,24,36,0.4)',
  overlayBg: '#3A4553',
  overlayFg: '#7d8d9f',
  overlayTitle: 'white',
  overlayHighlight: '#abc2e2',
};
