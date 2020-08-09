import { Theme, Button, TorrentListRow, ScrollBar } from './type';

export function setTheme(theme: Theme) {
  const root = document.documentElement.style;
  root.setProperty('--action-color', theme.actionColor)
  root.setProperty('--error-color', theme.errorColor)

  root.setProperty('--fg', theme.fg)
  root.setProperty('--bg', theme.bg)
  root.setProperty('--title', theme.title)
  root.setProperty('--border-color', theme.borderColor)

  root.setProperty('--priority-low', theme.priorityLow)
  root.setProperty('--priority-norm', theme.priorityNorm)
  root.setProperty('--priority-high', theme.priorityHigh)

  function setButton(prefix: string, button: Button) {
    root.setProperty(`${prefix}-fg`, button.fg)
    root.setProperty(`${prefix}-bg`, button.bg)
    root.setProperty(`${prefix}-border`, button.border)
    root.setProperty(`${prefix}-hover-fg`, button.hoverFg)
    root.setProperty(`${prefix}-hover-bg`, button.hoverBg)
    root.setProperty(`${prefix}-active-fg`, button.activeFg)
    root.setProperty(`${prefix}-active-bg`, button.activeBg)
    root.setProperty(`${prefix}-disabled-fg`, button.disabledFg)
    root.setProperty(`${prefix}-disabled-bg`, button.disabledBg)
    root.setProperty(`${prefix}-disabled-border`, button.disabledBorder)
  }

  setButton('--button', theme.button)
  setButton('--button-submit', theme.submitButton)

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

  root.setProperty('--overlay-background', theme.overlayBackground);

  root.setProperty('--modal-border-color', theme.modalBorderColor)
  root.setProperty('--modal-bg', theme.modalBg)
  root.setProperty('--modal-fg', theme.modalFg)
  root.setProperty('--modal-title', theme.modalTitle)

  root.setProperty('--context-menu-fg', theme.contextMenuFg)
  root.setProperty('--context-menu-bg', theme.contextMenuBg)
  root.setProperty('--context-menu-border', theme.contextMenuBorder)
  root.setProperty('--context-menu-hover-fg', theme.contextMenuHoverFg)
  root.setProperty('--context-menu-hover-bg', theme.contextMenuHoverBg)

  root.setProperty('--input-bg', theme.inputBg)
  root.setProperty('--input-fg', theme.inputFg)
  root.setProperty('--input-border', theme.inputBorder)
  root.setProperty('--input-placeholder', theme.inputPlaceholder)
  root.setProperty('--input-selected-bg', theme.inputSelectedBg)
  root.setProperty('--input-selected-fg', theme.inputSelectedFg)
  root.setProperty('--input-selected-border', theme.inputSelectedBorder)
  root.setProperty('--input-selected-placeholder', theme.inputSelectedPlaceholder)
}
