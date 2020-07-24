import React from 'react';
import Filter from './filter';
import TorrentResponse from '@puddle/transmission/responses/torrent';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface FilterListItemType<T> {
  id: T,

  /* The displayed title for the filter item. */
  title: string,

  /* The number of torrents associated with this torrent type. */
  count?: number,

  /* An optional icon to be displayed alongside this entry. */
  icon?: IconDefinition,

  /* whether this filter is currently active or not. */
  active?: boolean
}

/**
 * root interface for a filter consisting of one or more possible
 * items that the user can select at runtime.
 */
export default interface FilterList<T> extends Filter {
  title: string

  /**
   * filters associated with this filter instance.
   */
  filters: FilterListItemType<T>[]

  /**
   * select the given entry in this filters list.
   */
  selectItem: (i: T, append?: boolean) => void;

  /**
   * update filter counts and other relevent fields based on
   * the new complete torrent list of {@code t}.
   */
  updateTorrents: (t: Partial<TorrentResponse>[]) => void;
}
