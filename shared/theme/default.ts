import { Theme } from './type';

// reverse engineered from [[https://github.com/Flood-UI/flood][flood]].
export const defaultTheme: Theme = {
  actionColor: '#258de5',
  errorColor: '#f34570',

  fg: '#53718a',
  bg: '#e9eef2',
  title: '#34516C',
  borderColor: '#d2d8de',

  priorityLow: '#258de5',
  priorityNorm: '#39ce83',
  priorityHigh: '#39ce83',

  button: {
    fg: 'white',
    bg: '#8899A8',
    border: '#768a9b',
    hoverFg: 'white',
    hoverBg: '#9dabb7',
    activeFg: 'white',
    activeBg: '#768a9b',
    disabledFg: '#9dabb7',
    disabledBg: '#e9eef2',
    disabledBorder: '#d6dfe7',
  },
  submitButton: {
    fg: 'white',
    bg: '#349CF4',
    border: '#0d86ed',

    hoverFg: 'white',
    hoverBg: '#56adf6',

    activeFg: 'white',
    activeBg: '#56adf6',

    disabledFg: '#9dabb7',
    disabledBg: '#e9eef2',
    disabledBorder: '#d6dfe7',
  },

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
    selectedProgressBarFg: 'rgba(255,255,255,0.5)',
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
  // overlayContainerBackground: 'radial-gradient(circle, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.75) 100%)',

  overlayBackground: 'rgba(11,16,20,0.95)',

  modalBorderColor: '#363e48',
  modalBg: '#3A4553',
  modalFg: '#7d8d9f',
  modalTitle: '#b8c1cb',

  contextMenuFg: '#53718a',
  contextMenuBg: '#fff',
  contextMenuBorder: 'rgba(41,51,65,0.075)',
  contextMenuHoverFg: '#3e4e61',
  contextMenuHoverBg: 'rgba(233,238,242,0.4)',

  inputBg: '#293341',
  inputFg: '#8899A8',
  inputBorder: '#202D3C',
  inputPlaceholder: 'rgba(171,186,199,0.25)',
  inputSelectedBg: 'rgba(52,156,244,0.1)',
  inputSelectedFg: '#f6fafe',
  inputSelectedPlaceholder: 'rgba(125,191,248,0.5)',
  inputSelectedBorder: '#349CF4',
};
