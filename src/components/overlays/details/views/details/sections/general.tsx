import React from 'react';
import { useSelector } from 'react-redux';

import { torrentSelector } from '../../../utils';
import { TableSection, Missing, formatDate } from '../section';

export function GeneralSection() {
  const addedDate = useSelector(torrentSelector(t => t.addedDate));
  const downloadDir = useSelector(torrentSelector(t => t.downloadDir));
  const labels = useSelector(torrentSelector(t => t.labels));

  const tags = labels.length === 0 ? (<Missing/>) : (
    <ul className="tags">
      {labels.map(label => <li key={label}>{label}</li>)}
    </ul>
  )

  return TableSection({
    title: 'General',
    entries: [
      {
        key: 'Added',
        val: formatDate(addedDate)
      },
      {
        key: 'Location',
        val: downloadDir,
      },
      {
        key: 'Tags',
        val: tags
      }
    ]
  })
}
