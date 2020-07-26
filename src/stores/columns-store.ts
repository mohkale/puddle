import { createSlice, createAction } from '@reduxjs/toolkit';

export const DEFAULT_WIDTH = 100;
export const MINIMUM_WIDTH = 10;

export enum ColumnType {
  NAME,
  PROGRESS,
  DOWNLOADED,
  DOWNLOAD_SPEED,
  UPLOADED,
  UPLOAD_SPEED,
  ETA,
  RATIO,
  FILE_SIZE,
  ADDED
}

export interface Column {
  title: string
  width: number
}

export interface ColumnState {
  columns: { [key in ColumnType]: Column }
  activeColumn: ColumnType
  isDescending: boolean
  columnOrder: ColumnType[]
}

export const defaultState: ColumnState = {
  columns: {
    [ColumnType.NAME]: {
      title: "Name",
      width: 244,
    },
    [ColumnType.PROGRESS]: {
      title: "Progress",
      width: 164,
    },
    [ColumnType.DOWNLOADED]: {
      title: "Downloaded",
      width: DEFAULT_WIDTH,
    },
    [ColumnType.DOWNLOAD_SPEED]: {
      title: "Downloaded Speed",
      width: DEFAULT_WIDTH,
    },
    [ColumnType.UPLOADED]: {
      title: "Uploaded",
      width: DEFAULT_WIDTH,
    },
    [ColumnType.UPLOAD_SPEED]: {
      title: "Upload Speed",
      width: DEFAULT_WIDTH,
    },
    [ColumnType.ETA]: {
      title: "ETA",
      width: DEFAULT_WIDTH,
    },
    [ColumnType.RATIO]: {
      title: "Ratio",
      width: DEFAULT_WIDTH,
    },
    [ColumnType.FILE_SIZE]: {
      title: "File Size",
      width: DEFAULT_WIDTH,
    },
    [ColumnType.ADDED]: {
      title: "Added",
      width: DEFAULT_WIDTH,
    },
  },
  activeColumn: ColumnType.NAME,
  isDescending: true,
  columnOrder: [
    ColumnType.NAME,
    ColumnType.PROGRESS,
    ColumnType.DOWNLOADED,
    ColumnType.DOWNLOAD_SPEED,
    ColumnType.UPLOADED,
    ColumnType.UPLOAD_SPEED,
    ColumnType.ETA,
    ColumnType.RATIO,
    ColumnType.FILE_SIZE,
    ColumnType.ADDED
  ]
}

export const resized = createAction<{ column: ColumnType, delta: number }>('columns/resized');
export const selected = createAction<{ column: ColumnType }>('columns/selected')

// const columnsSlice = createSlice({
//   name: 'columns',
//   initialState: defaultState,
//   reducers: {},
//   extraReducers: builder =>
//     builder
//       .addCase(resized, (state, action) => {
//         state.columns[action.payload.column].width += action.payload.delta
//       })
//       .addCase(selected, (state, action) => {
//         if (state.activeColumn === action.payload.column) {
//           state.isDescending = !state.isDescending
//         } else {
//           state.activeColumn = action.payload.column
//         }
//       })
// })

// export default columnsSlice.reducer
