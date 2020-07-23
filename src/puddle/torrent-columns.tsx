import React, { Fragment } from 'react';
import TorrentResponse, {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

/**
 * The default width of a new column in the puddle torrents table.
 */
export const DEFAULT_WIDTH = 100;

let columnCounter = 0;

class TorrentStatusIcon extends React.PureComponent<{ status: TorrentStatus }> {
  render() {
    let icon;
    switch (this.props.status) {
      case TorrentStatus.STOPPED:
      case TorrentStatus.CHECK_WAIT:
      case TorrentStatus.SEED_WAIT:
      case TorrentStatus.DOWNLOAD_WAIT:
      case TorrentStatus.CHECK:
      case TorrentStatus.DOWNLOAD:
      case TorrentStatus.SEED:
        icon = faExclamation
        break
    }

    return <FontAwesomeIcon className="icon" icon={icon}/>
  }
}

const BYTE_SCALES: [string, number][] = [
  ['t', 1099511627776.0],
  ['g', 1073741824.0],
  ['m', 1048576.0],
  ['k', 1024.0]
]

function scaleBytes(bytes: number): [number, string] {
  const [scale, mul] = BYTE_SCALES.find((([_, val]) => bytes >= val)) || BYTE_SCALES[BYTE_SCALES.length-1];

  return [bytes/mul, scale]
}

// https://github.com/tremc/tremc/blob/master/tremc#L3362
function timeFormat(duration: number): string {
  return duration.toString()
}

function padString(str: string, length: number, char: string='0') {
  if (str.length >= length) {
    return str
  }
  let i = length - str.length;
  while (i-- > 0) {
    str = char + str
  }
  return str;
}

/**
 * Interface for a single column in the torrents view.
 *
 * This interface specifies the means through which we both
 * calculate and display a single related piece of information
 * about a torrent from a list of possible torrent fields. The
 * end goal being to minimise the amount of data transfer between
 * transmission and puddle while maximising the velocity of
 * information flow.
 *
 */
export interface TorrentColumn {
  /** shown in the top row of the given column. */
  title: string

  /** identifier used for reacts key management system */
  key: number

  width?: number

  // cached: boolean

  /** whether this column is currently being shown. */
  active?: boolean

  /**
   * The torrent response fields needed to calculate the display
   * of this column. Quite often this'll only be a single entry
   * but for some columns (such as download progress) you may need
   * more information, such as total file size and downloaded size.
   *
   * puddle will accumulate all the associated fields for the active
   * columns, retrieve just them from transmission and then render
   * the result in the DOM.
   */
  fields: (keyof TorrentResponse)[]

  /** Convert a transmission response to something to show the user. */
  action: (resp: Partial<TorrentResponse>) => JSX.Element | string
}

/**
 * Container for a collection of columns, which caches redundant
 * calculation to add a mild speed boost.
 *
 * It stores both all known columns, the active columns, the fields
 * for the active columns in their own variables so they don't need
 * to be looked up every render cycle.
 */
export default class Columns {
  columns: TorrentColumn[] = []
  constructor(...columns: TorrentColumn[]) {
    this.setColumns(columns)
  }

  private _activeColumns: TorrentColumn[] = []
  get activeColumns() {
    return this._activeColumns
  }

  private _fields: (keyof TorrentResponse)[] = []
  get fields() {
    return this._fields
  }

  /**
   * Assign the currently active columns. This should be
   * a copy of {@code this.columns}. You're allowed to
   * reorder columns and disable columns, but not to omit
   * them. WARN if you omit a column in {@code this.columns}
   * from {@code columns} that column will be erased
   * permenently with no means for recovery.
   */
  setColumns(columns: TorrentColumn[]) {
    this.columns = columns
    this._activeColumns = columns.filter(a => a.active)
    this._fields = this._activeColumns.flatMap(a => a.fields)
    // force transmission to always include the torrent id.
    this._fields.push("id")
  }
}

export const defaultTorrentColumns = new Columns(
  {
    title: "Name",
    key: columnCounter++,
    width: 244,
    active: true,
    fields: ["name"],
    action: resp => resp.name!,
  },
  {
    title: "Progress",
    key: columnCounter++,
    active: true,
    fields: ["status", "sizeWhenDone", "haveValid", "haveUnchecked"],
    action: resp => {
      const downloaded = (resp.haveValid! + resp.haveUnchecked!)
      const complete = 100 * (downloaded / resp.sizeWhenDone!) || 0
      return (
        <Fragment>
          <TorrentStatusIcon status={resp.status!}/>
          <span className="progress-bar">{complete.toFixed(0)}%</span>
        </Fragment>
      )
    }
  },
  {
    title: "Downloaded",
    key: columnCounter++,
    active: true,
    fields: ["downloadedEver"],
    action: resp => {
      const [num, unit] = scaleBytes(resp.downloadedEver!)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B</em> </span>
      )
    },
  },
  {
    title: "Download Speed",
    key: columnCounter++,
    active: true,
    fields: ["rateDownload"],
    action: resp => {
      const [num, unit] = scaleBytes(resp.rateDownload!)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B/s</em> </span>
      )
    }
  },
  {
    title: "Uploaded",
    key: columnCounter++,
    active: true,
    fields: ["uploadedEver"],
    action: resp => {
      const [num, unit] = scaleBytes(resp.uploadedEver!)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B</em> </span>
      )
    },
  },
  {
    title: "Upload Speed",
    key: columnCounter++,
    active: true,
    fields: ["rateUpload"],
    action: resp => {
      const [num, unit] = scaleBytes(resp.rateUpload!)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B/s</em> </span>
      )
    }
  },
  {
    title: "ETA",
    key: columnCounter++,
    active: true,
    fields: ["eta", "status"],
    action: resp => {
      if (resp.eta! <= -1 || resp.status! !== TorrentStatus.DOWNLOAD) {
        return ""
      }

      return timeFormat(resp.eta!)
    }
  },
  {
    title: "Ratio",
    key: columnCounter++,
    active: true,
    fields: ["uploadRatio"],
    action: resp => (resp.uploadRatio! >= 0) ? resp.uploadRatio!.toFixed(2) : '',
  },
  {
    title: "File Size",
    key: columnCounter++,
    active: true,
    fields: ["sizeWhenDone"],
    action: resp => {
      const [num, unit] = scaleBytes(resp.sizeWhenDone!)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B</em> </span>
      )
    }
  },
  {
    title: "Added",
    key: columnCounter++,
    active: true,
    fields: ["addedDate"],
    action: resp => {
      const d = new Date(resp.addedDate! * 1000),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDay();

      // NOTE maybe include hour.minute.second?
      return `${d.getFullYear()}.${padString(month.toString(), 2)}.${padString(day.toString(), 2)}`
    }
  }
  // TODO peers, seeds, tags
)
