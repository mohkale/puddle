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
  torrentsRowFg: string,
  torrentsRowBg: string,
  torrentsActiveRowFg: string,
  torrentsActiveRowBg: string,
  torrentsActiveRowBorderColor: string,

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
  root.setProperty('--torrents-row-fg', theme.torrentsRowFg)
  root.setProperty('--torrents-row-bg', theme.torrentsRowBg)
  root.setProperty('--torrents-active-row-fg', theme.torrentsActiveRowFg)
  root.setProperty('--torrents-active-row-bg', theme.torrentsActiveRowBg)
  root.setProperty('--torrents-active-row-border-color', theme.torrentsActiveRowBorderColor)

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
  torrentsRowFg: '#c3ccd3',
  torrentsRowBg: 'transparent',
  torrentsActiveRowFg: 'rgba(255,255,255,0.5)',
  torrentsActiveRowBg: '#258de5',
  torrentsActiveRowBorderColor: '#1b86e0',

  overlayContainerBackground: 'radial-gradient(circle, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.75) 100%)',
  overlayBorderColor: 'rgba(9,24,36,0.4)',
  overlayBg: '#3A4553',
  overlayFg: '#7d8d9f',
  overlayTitle: 'white',
  overlayHighlight: '#abc2e2',
};
